const checkArr = [false,false,false, false,false,false,false,false];
const memberArr = ['user011','user0222','user033'];

const allAgreement = document.querySelector("#allAgreement");
allAgreement.addEventListener("change",function(){
    const must = document.querySelector("#mustAgreement");
    const privacy = document.querySelector("#privacyAgreement");
    const option = document.querySelector("#optionalAgreement");
    const age = document.querySelector("#ageAgreement");
    const status = allAgreement.checked;
    
    must.checked=status;
    privacy.checked=status;
    option.checked=status;
    age.checked=status;
});


const comment = $(".comment");
$("#memberId").on("change",function(){
    
    const idReg = /^[a-z0-9]{6,16}$/;
    const inputId = $("#memberId").val();
    const check = idReg.test(inputId);
    if(check){
    
    const index = memberArr.indexOf(inputId);
        if(index == -1){
            
            $("#idChkBtn").on("click",function(){
                $(".modal-wrap").css("display","flex");
            });
            $(".inputWrap>input[type=button]").on("click",function(){
                $(".modal-wrap").css("display","none");
            });
        }else{
            
            
            comment.eq(0).text("이미 사용중인 아이디입니다.");
            comment.eq(0).css("color","red");
            $(this).css("border","1px solid red");
            checkArr[0] = false;
    
        }
    }else{
    
            comment.text("6자이상 16자 이하의 영문과 숫자를 조합");
            comment.css("color","pink");
            $(this).css("border","1px solid pink");
            checkArr[0] = false;
    
    }
});




































    


    