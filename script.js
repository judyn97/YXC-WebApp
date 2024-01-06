/*
fetch("http://192.168.0.145/YamahaExtendedControl/v1/main/setInput?input=airplay&mode=autoplay_disabled")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));*/
let inputList = [];
let inputListID = [];

const inputSelect = document.querySelector("#input-select");

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
            alert("Please Add input first !")
        }
        else{
            const response = await fetch(`http://192.168.0.145/YamahaExtendedControl/v1/main/setInput?input=${inputSelected}`);
            const data = await response.json()
        }
    }
    catch(error){
        console.error(error);
    }
}