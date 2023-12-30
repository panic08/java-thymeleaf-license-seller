$("#loader").show();

function checkOnAuthorize(){
    let formData = new FormData();

    const key = getCookie("jsec");

    formData.append("key", key);

    fetch('/auth/login', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok){
                deleteCookie("jsec");
                $("#authContainer").show();
                $("#successContent").hide();

                return;
            }
            $("#authContainer").hide();
            $("#successContent").show();
            handleDataReceive(key);
        })
        .catch(() => {
            deleteCookie("jsec");
            $("#authContainer").show();
            $("#successContent").hide();
        });

}

if (getCookie("jsec") != null){
    checkOnAuthorize();
} else {
    $("#authContainer").show();
    $("#successContent").hide();
}

$("#loader").hide();

function authenticate() {
    if ($("#keyInput").val() === "") {
        $("#keyInput").addClass("is-invalid");
    } else {
        $("#authContainer").hide();
        $("#loader").show();

        let formData = new FormData();
        formData.append('key', $("#keyInput").val());

        fetch('/auth/login', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok){
                    $("#loader").hide();
                    $('#errorAlert').css('display', 'block');
                    $("#authContainer").show();

                    return;
                }
                const authorizationHeader = response.headers.get('authorization');
                setCookie('jsec', authorizationHeader);

                $("#loader").hide();
                $("#authContainer").hide();
                $("#successContent").show();
            })
            .catch(error => {
                $("#loader").hide();
                $('#errorAlert').css('display', 'block');
                $("#authContainer").show();
            });
    }
}

function handleKeyInputChange() {
    if ($("#keyInput").val() === "") {
        $("#keyInput").addClass("is-invalid");
    } else {
        $("#keyInput").removeClass('is-invalid');
        $("#keyInput").addClass("was-validated");
    }
}

function fillModalData(name, phone, additionalData, date) {
    document.getElementById('modalName').innerText = name;
    document.getElementById('modalPhone').innerText = phone;
    document.getElementById('modalData').innerText = additionalData;
    document.getElementById('modalDate').innerText = date;
}

function openModal(name, phone, additionalData, date) {
    fillModalData(name, phone, additionalData, date);
    $('#requestDataModal').modal('show');
}

function showRequestDetails(name, phone, additionalData, date) {
    openModal(name, phone, additionalData, date);
}

function handleDataReceive(key){
    fetch('/order/getAll', {
        headers: {
            Authorization: key
        }
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const {id, first_name, phone_number, data, created_at} = element;

                let formattedData = data.substring(0, 35) + '... ';

                let date = new Date(created_at);

                let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

                let day = date.getDate();
                let month = months[date.getMonth()];
                let year = date.getFullYear();
                let hours = date.getHours();
                let minutes = date.getMinutes();

                let formattedDate = `${day} ${month} ${year} в ${hours}:${minutes}`;

                const newElement = document.createElement("div");
                newElement.classList.add("request-item", "card", "mb-2", "mt-3");

                newElement.innerHTML = `
                <div data-id="${id}" class="card-body">
                    <h5 class="card-title">${first_name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${phone_number}</h6>
                    <p class="card-text">${formattedData} <button class="btn btn-primary btn-sm" onclick="showRequestDetails('${first_name}', '${phone_number}', '${data}', '${formattedDate}')" data-toggle="modal" data-target="#requestDataModal">Подробнее</button></p>
                    <button class="btn btn-danger btn-sm float-right" onclick="deleteOrder(${id})">⨉</button>
                </div>
            `;

                document.getElementById("orders").appendChild(newElement);
            });
        });
}

function deleteOrder(id){
    let orderElements = document.querySelectorAll('.card-body')

    fetch(`/order/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: getCookie('jsec')
        }
    })

    orderElements.forEach(c => {
        if (c.getAttribute('data-id') == id){
            console.log(c);

            document.getElementById("orders").removeChild(c.parentNode)
        }
    });
}
