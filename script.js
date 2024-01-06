/*
fetch("http://192.168.0.145/YamahaExtendedControl/v1/main/setInput?input=airplay&mode=autoplay_disabled")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));*/
let inputList = [];
let inputListID = [];

const inputSelect = document.querySelector("#input-select");
const ipAddressInput = document.querySelector("#ip-input");
const ipContainer = document.querySelector("#ip-container");
const inputContainer = document.querySelector("#input-container");
const modelConnected = document.querySelector("#model-id");
const powerStatus = document.querySelector("#power-id");
let deviceIPAddress = '';

async function checkDeviceIP(){
    try{
        let ipAddress = ipAddressInput.value;
        deviceIPAddress = ipAddress;
        console.log(ipAddress);
        const response = await fetch(`http://${ipAddress}/YamahaExtendedControl/v1/system/getDeviceInfo`);
        if(!response.ok){
            throw new Error("Could not fetch");
        }
        const data = await response.json();

        if(data.response_code === 0)
        {
            ipContainer.style.display = "none";
            inputContainer.style.display = "flex";
            modelConnected.innerText = `Model connected to: ${data.model_name}`;
            getStatus();
        }
    }
    catch(error){
        console.error(error);
        modelConnected.innerText = `${error}`;
    }
}

async function getFeatures(){
    try{
        const response = await fetch("http://192.168.0.145/YamahaExtendedControl/v1/system/getFeatures")
        const data = await response.json();
        inputList = data.system.input_list;
        //console.log(data.system.input_list);
        console.log(inputList[0].id);


        for( let i=0; i<inputList.length; i++)
        {
            inputListID[i] = inputList[i].id;
            let html = `<option id="${inputListID[i]}-input">${inputListID[i]}</option>`;
            inputSelect.innerHTML += html;
        }
        console.log("test",inputListID);
    }
    catch(error){
        console.error(error);
    }
}

async function changeInput(){
    try{
        let inputSelected = inputSelect.value;
        if(inputSelected == ""){
            alert("Please Get input first !")
        }
        else{
            const response = await fetch(`http://192.168.0.145/YamahaExtendedControl/v1/main/setInput?input=${inputSelected}`);
            const data = await response.json()
            console.log("change",data.response_code)
        }
    }
    catch(error){
        console.error(error);
    }
}

async function getStatus(){
    try{
        console.log("122",deviceIPAddress);
        const response = await fetch(`http://${deviceIPAddress}/YamahaExtendedControl/v1/main/getStatus`);
        const data = await response.json();

        powerStatus.innerText = `Device power status: ${data.power}`

    }
    catch(error){
        console.error(error);
    }
}