import { url } from "inspector";
import { loadnhistory } from "./app.js";
fetch(`${window.location.origin}/api/profile`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
})
.then(response => response.json())
.then(data => {
    const userInfo = {
        name: data.name,
        login: data.login,
        email: data.email,
        id:data.id,
        profilePicPath:`${window.location.origin}${data.profilePicPath}`,
        wallpaperPath:`${window.location.origin}${data.wallpaperPath}`,
        tfa:data.tfa,
    };
    console.log(userInfo);
})
.catch(error => {
    console.error('Error:', error);
});


export const updateSettingsPage = () => {

    let settingsCoverData = document.querySelector('.settings_cover_data') as HTMLAreaElement;

    const close = document.getElementById('close') as HTMLElement;

    close.addEventListener('click', () => {
        loadnhistory('profil');
    });

    const settingsCoverDataHTMLGen = 
    `
    <img class="settings_cover" src="/public/images/profile_cover2.png">
    <div class="settings_pic_data">
        <img class="settings_pic" src="/public/profile_pictures/ProfilePic.jpeg">
        <span class="online"></span>
        <label class="settings_user_name">
            
        </label>
        <span id="SWitchbtn" class="TwoFF">
            <img class="SwitchOFF" src="/public/logos/SwitchOFF.svg">
        </span>
        <label class="FA_TEXT">
            2FA :
        </label>
        <img id="cover" class="add_sitting_cover" src="/public/logos/addPhoto.svg">
        <img id="profile" class="add_sitting_pic" src="/public/logos/addPhoto.svg">
        <input id="cover" class="Sitting_Uplouad_cover" type="file">
        <input id="profile" class="Sitting_Uplouad_pic" type="file">
        <p id="fileName">
        
        </p>
    </div>
    `;

    settingsCoverData!.innerHTML = settingsCoverDataHTMLGen;

    // function uploadPics(uploadBtn: string, inputSwitch: string) {
    //     const coverBtEdit = document.querySelector(uploadBtn) as HTMLElement | null;
    //     const inputUpload = document.querySelector(inputSwitch) as HTMLInputElement | null;
    //     const profilePic = document.getElementById('profile-pic') as HTMLImageElement | null;

    
    //         coverBtEdit!.addEventListener('click', () => {
    //             inputUpload!.click();
    //         });
            
    //         inputUpload!.addEventListener('change', () => {
    //             if (inputUpload!.files && inputUpload!.files.length > 0) {
    //                 const file = inputUpload!.files[0]; 
    //                 console.log("Selected file:", file);
        
    //                 const imageUrl = URL.createObjectURL(file);
    //                 console.log("Generated Image URL:", imageUrl);
        
    //                 profilePic!.src = imageUrl;
    //             } else {
    //                 console.log("No file selected.");
    //             }
    //         });
        

    //     // document.getElementById("fileInput").addEventListener("change", function(event) {
    //     //     const file = event.target.files[0]; // Get selected file
    //     //     if (file) {
    //     //         const imageUrl = URL.createObjectURL(file); // Create temporary URL
    //     //         const imgElement = document.getElementById("previewImage");
    //     //         imgElement.src = imageUrl;
    //     //         // imgElement.style.display = "block"; // Show the image
    //     //     }
    //     // });
    // }

    


    // function upload() {
    //     console.log("upload() function called");
    
    //     const inputUpload = document.getElementById('file-upload') as HTMLInputElement | null;
    //     const profilePic = document.getElementById('profile-pic') as HTMLImageElement | null;
    
    //     if (!inputUpload) {
    //         console.log("inputUpload element not found");
    //         return;
    //     }
    //     if (!profilePic) {
    //         console.log("profilePic element not found");
    //         return;
    //     }
    
    //     console.log("Elements found successfully!");
    
    //     inputUpload.addEventListener('change', () => {
    //         console.log("File input changed");
    
    //         if (inputUpload.files && inputUpload.files.length > 0) {
    //             const file = inputUpload.files[0];
    //             console.log("Selected file:", file);
    
    //             const imageUrl = URL.createObjectURL(file);
    //             console.log("Generated Image URL:", imageUrl);
    
    //             profilePic.src = imageUrl;
    //         } else {
    //             console.log("No file selected.");
    //         }
    //     });
    // }
    
    function uploadPicsProfile(uploadBtn: string, inputSwitch: string, type: string) {
        const coverBtEdit = document.querySelector(uploadBtn) as HTMLElement | null;
        const inputUpload = document.querySelector(inputSwitch) as HTMLInputElement | null;
        const profilePic = document.querySelector(type) as HTMLImageElement | null;
    
        if (coverBtEdit && inputUpload && profilePic) {
            coverBtEdit.addEventListener('click', () => inputUpload.click());
    
            inputUpload.addEventListener('change', () => {
                if (!inputUpload.files?.[0]) return;
    
                const file = inputUpload.files[0];
                const img = new Image();
                
                img.onload = () => {
                    // Create canvas to force 736x736
                    const canvas = document.createElement('canvas');
                    canvas.width = 736;
                    canvas.height = 736;
                    const ctx = canvas.getContext('2d')!;
                    
                    // STRETCH MODE (simplest)
                    ctx.drawImage(img, 0, 0, 736, 736);
                    
                    profilePic.src = canvas.toDataURL();
                    URL.revokeObjectURL(img.src);
                };
                
                img.src = URL.createObjectURL(file);
            });
        }
    }
    function uploadPicsCover(uploadBtn: string, inputSwitch: string, type: string) {
        const coverBtEdit = document.querySelector(uploadBtn) as HTMLElement | null;
        const inputUpload = document.querySelector(inputSwitch) as HTMLInputElement | null;
        const profilePic = document.querySelector(type) as HTMLImageElement | null;
    
        if (coverBtEdit && inputUpload && profilePic) {
            coverBtEdit.addEventListener('click', () => inputUpload.click());
    
            inputUpload.addEventListener('change', () => {
                if (!inputUpload.files?.[0]) return;
    
                const file = inputUpload.files[0];
                const img = new Image();
                
                img.onload = () => {
                    // Create canvas to force 736x736
                    const canvas = document.createElement('canvas');
                    canvas.width = 2740;
                    canvas.height = 942;
                    const ctx = canvas.getContext('2d')!;
                    
                    // STRETCH MODE (simplest)
                    ctx.drawImage(img, 0, 0, 2740, 2740);
                    
                    profilePic.src = canvas.toDataURL();
                    URL.revokeObjectURL(img.src);
                };
                
                img.src = URL.createObjectURL(file);

                console.log(img.src);
            });
        }
    }
    
    

    uploadPicsCover('.add_sitting_cover', '.Sitting_Uplouad_cover', '.settings_cover');
    uploadPicsProfile('.add_sitting_pic', '.Sitting_Uplouad_pic', '.settings_pic');

    const toggleVisibility = (inputSelector: string, buttonSelector: string) => {

        const on = '<img class="Show" src="../public/logos/eye_on.svg">';
        const off = '<img class="Show" src="../public/logos/eye_off.svg">';
        const check_input = document.querySelector(inputSelector) as HTMLInputElement;
        let input = document.querySelector(buttonSelector) as HTMLSpanElement;
        
        if (!check_input || !input) return;

        input.addEventListener('click', (event) => {
            event.preventDefault();

            if (check_input.type === "password")
            {
                input.innerHTML = on;
                check_input.type = "text";
            }
            else
            {
                input.innerHTML = off;
                check_input.type = "password";
            }
            
        });
    };

    function switchbtns(butn: string, inputTag : string) {
        const btns = document.querySelectorAll(butn) as NodeListOf<HTMLButtonElement>;
        const inputs = document.querySelector(inputTag) as HTMLInputElement;
        const showPsStting = document.querySelector('.Sitting_show_btn') as HTMLButtonElement;
        const eye = document.querySelector('.show_psStiing') as HTMLElement;
        const off = '<img class="Show" src="../public/logos/eye_off.svg">';


        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.innerHTML.trim() === "Edit")
                {
                    btn.innerHTML = "Save";
                    btn.classList.add('save');
                    inputs.disabled = false;
                    showPsStting.disabled = false;

                } else
                {
                    btn.innerHTML = "Edit";
                    btn.classList.remove('save');
                    inputs.disabled = true;
                    showPsStting.disabled = true;
                    
                    if (inputTag === '.input_settings_password')
                    {
                        inputs.type = "password";
                        showPsStting.innerHTML = off;
                    }
                }
            });
        });
    }

    switchbtns('.bt_edit_name', '.input_settings_name');
    switchbtns('.bt_edit_User_name', '.input_settings_User_name');
    switchbtns('.bt_edit_email', '.input_settings_email');
    switchbtns('.bt_edit_password', '.input_settings_password');

    function changeData()
    {
        const editName = document.querySelector('.input_settings_name') as HTMLInputElement;
        const btnName = document.querySelector('.bt_edit_name') as HTMLButtonElement;

        let nameVal = '';

        editName.addEventListener('input', () => {
            
            nameVal = editName.value
        });
        if(editName.disabled === true)
        {
            btnName.addEventListener('click', () => {
                console.log(nameVal);
            });
        }
    }
    changeData();

    
    toggleVisibility('.input_settings_password', '.Sitting_show_btn');

    function FaSittings()
    {
        const allSittingsData = document.getElementById('All_setings_FA_data') as HTMLElement;
        const allSittingsFaData = document.querySelector('.all_settingsTOWFF_info') as HTMLElement;
        const SaveBt = document.getElementById('SaveFA') as HTMLElement;
        const switchONBtn = document.getElementById('SWitchbtn') as HTMLElement;

        const FAinput = document.querySelector('.Verify_Input_FA') as HTMLInputElement;
        const FAval = FAinput.value;

        const FAerrormsg = document.querySelector('.FAerror') as HTMLElement;
        const Qrgen = document.querySelector('.QrGen') as HTMLElement;

        const cansel = document.getElementById('CancelFA') as HTMLButtonElement;
        const OFF = '<img class="SwitchOFF" src="/public/logos/SwitchOFF.svg">';
        const ON = '<img class="SwitchON" src="/public/logos/SwitchON.svg">';

        fetch(`${window.location.origin}/api/2fa/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
            credentials : "include"
        })
        .then(response => response.json())
        .then(data => {
        console.log("Success:", data.qr_url);
        const QR =  data.qr_url;
        Qrgen.innerHTML = `<img class="QR_test" src="${QR}">`;
        })

        allSittingsFaData.classList.add('hide');

        switchONBtn.addEventListener('click', () => {
            allSittingsFaData.classList.remove('hide');
            allSittingsData.classList.add('blur');
        });

        SaveBt.addEventListener('click', () => {
                const FA = {
                    otp : FAinput.value.trim(),
                }
                fetch(`${window.location.origin}/api/2fa/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(FA),
                    credentials : "include"
                })
                .then(response => response.json())
                .then(data => {
                // console.log("Success:", data.success);
                
                const FaOK = data.success;
                const FaKo = data.error;
                    if(FaOK === "2FA token verified successfully")
                    {
                        FAerrormsg.classList.remove('FAerrorRed');
                        FAerrormsg.classList.add('FAerrorGren');
                        FAerrormsg.innerHTML = "2FA token verified successfully";
                        
                        switchONBtn.innerHTML = ON;
                        switchONBtn.classList.add('SwitchedON');
                        switchONBtn.classList.remove('SwitchedOFF');


                        allSittingsFaData.classList.add('hide');
                        allSittingsData.classList.remove('blur');
                    }
                    else if(FaKo == "Invalid 2FA token")
                    {
                        FAerrormsg.classList.remove('FAerrorGren');
                        FAerrormsg.classList.add('FAerrorRed');
                        FAerrormsg.innerHTML = "Invalid 2FA token"
                    }
                })

                FAinput.addEventListener('input', () => {
                    FAerrormsg.innerHTML = ""
                    FAinput.classList.remove('invalid');
                });
           
        })
        cansel.addEventListener('click', () => {

            allSittingsFaData.classList.add('hide');
            allSittingsData.classList.remove('blur');

            switchONBtn.innerHTML = OFF;
            switchONBtn.classList.remove('SwitchedON');
            switchONBtn.classList.add('SwitchedOFF');
        });
    }
    
    FaSittings();

    function getUserData()
    {

        const name = document.querySelector('.input_settings_name') as HTMLInputElement;
        const username = document.querySelector('.input_settings_User_name') as HTMLInputElement;
        const email = document.querySelector('.input_settings_email') as HTMLInputElement;

        const fullname = document.querySelector('.settings_user_name') as HTMLLabelElement;

        fetch(`${window.location.origin}/api/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials : "include"
        })
        .then(response => response.json())
        .then(data => {
        
        const nameVal = data.name;
        const userVal = data.login;
        const emailVal = data.email;

        name.value = nameVal;
        username.value = userVal;
        email.value = emailVal;
        
        fullname.innerHTML = nameVal;
            
        })
    }
    getUserData();

    function deletACC()
    {
        const deeletBtn  = document.querySelector('.delete-button') as HTMLButtonElement;
        const loderDelete = document.querySelector('.deletting') as HTMLElement;
        const allSetting = document.getElementById('All_setings_FA_data') as HTMLElement;

        deeletBtn.addEventListener('click', () => {
            console.log('BAD TRIP');
                const id = '';
                fetch(`${window.location.origin}/api/user/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
                credentials : "include"
            })
            .then(response => response.json())
            .then(data => {
                allSetting.classList.add('blur');
                loderDelete.style.display = "";
                setTimeout(() => {
                    loadnhistory('home');
                }, 3000);
            })

        });
    }

    deletACC();

}
