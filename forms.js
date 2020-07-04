import  {closeModalWindow, openModal} from "./modal";
import {postData} from "../services/services";
function forms(modalTimerId, formSelector){
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const massage = {
        loading: "img/form/original.svg",
        success: "Спасибо, мы с вами свяжимся",
        failure: "Что-то пошло не так"
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData (form){ 
        form.addEventListener("submit", (e) =>{
            e.preventDefault();

            const statusMassage = document.createElement("img");
            statusMassage.src = massage.loading;
            statusMassage.style.cssText =`
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMassage);
            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showThanksModal(massage.success);
                statusMassage.remove();
            }).catch(data => {
                showThanksModal(massage.failure);
            }).finally(data => {
                form.reset();
            });

        });
    }

    function showThanksModal(massage){
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        openModal(".modal", modalTimerId);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${massage}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModalWindow(".modal");
        }, 4000);
    }
}

export default forms;