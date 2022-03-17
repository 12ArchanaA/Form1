function _(id)
{
    return document.getElementById(id);
}

_("Registration-form").addEventListener("submit",validate);


function validate(event)
{
    event.preventDefault();
    var formData = new FormData(event.target);
    var name = formData.get("name");
    var email = formData.get("email");
    var phone = formData.get("phone");
    var address = formData.get("address");
    var city = formData.get("city");
    var state = formData.get("state");
    var postalCode = formData.get("postalCode"); 
    submit({name,email,phone,address,city,postalCode,state});         
}

function submit(data){
    fetch("http://192.168.1.39:5000/organization/register", {
        method : "POST",
        headers:{
        "Content-type" : "application/json"
        },
        body : JSON.stringify(data),
    })
    .then((response) =>response.json())
    .then((result)=>{
        for(var j=0;j<document.getElementsByClassName("error-message").length;j++)
        {
            document.getElementsByClassName("error-message")[j].innerHTML = "";
        }
           if(!result.status)
           {
               for(var i=0 ; i < result.data.length ; i++)
               {
                   _(result.data[i].path+ "-error").innerHTML = result.data[i].message;
               } 
           }
           else{
               localStorage.setItem("token", result.data.token);
               window.location.href = "./otp.html?phone=" + data.phone + "&email=" + data.email;
               console.log("Success");
           }
        //window.location.href = "./user.html?id=" + result.id;
    })

    .catch((err) =>{
        console.log(err);
    });
}



