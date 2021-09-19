 
const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileinput = document.querySelector("#fileinput"); 

const host = "https://innshare.herokuapp.com/";
const upLoadURL = host + "api/files"

dropZone.addEventListener("dragover" ,(e)=>{
//    console.log("draging");
e.preventDefault();
if(!dropZone.classList.contains("dragged")){
    dropZone.classList.add("dragged");
}
});

dropZone.addEventListener("dragleave",(e)=>{
    e.preventDefault();

    dropZone.classList.remove("dragged");
})

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    //console.log(e);
     const files = e.dataTransfer.files;
     //console.log(files);
    if(files.length){
        fileinput.files =files;
        uploadFile();
    }
})
    
browseBtn.addEventListener("click" ,(e)=>{
fileinput.click();

})


const uploadFile = () =>{
    const fromData = new FormData();


const file = fileinput.files[0];
fromData.append("myfile" , file);
const xhr  = new XMLHttpRequest();

xhr.onreadystatechange = () =>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        console.log(xhr.response);
    }
}
xhr.open("POST" ,upLoadURL);
xhr.send(fromData);

}

















