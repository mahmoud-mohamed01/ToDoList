let checboxs=document.querySelectorAll(".chk");

for(let i=0;i<checboxs.length;i++)
{
    
    checboxs[i].addEventListener('change', function() {
        if (this.checked) {
           let text=checboxs[i].nextElementSibling;
           text.style.textDecoration="line-through";
           text.style.textDecorationColor="rgba(137, 43, 226, 0.47)";
           text.style.textDecorationThickness = "5px";

        console.log("Checkbox is checked..");
        } else {
           let text=checboxs[i].nextElementSibling;
           text.style.textDecoration="none";
      

        }
    });
}