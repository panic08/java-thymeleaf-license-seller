$("#loader").show();

function checkOnAuthorize(){
    let formData = new FormData();

    const key = getCookie("jsec");

    formData.append("key", key);

    axios.post('/auth/login', formData)
        .then(() => {
            $("#authContainer").hide();
            $("#successContent").show();

            handleDataReceive(key);
        })
        .catch(() => {
            deleteCookie("jsec");

            $("#authContainer").show();
            $("#successContent").hide();
        })
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

        axios.post('http://localhost:8080/auth/login', formData)
            .then(response => {
                setCookie('jsec', response.headers['authorization']);

                $("#loader").hide();
                $("#authContainer").hide();
                $("#successContent").show();
                console.log('Ответ от сервера');
            })
            .catch(error => {
                $("#loader").hide();
                $('#errorAlert').css('display', 'block');
                $("#authContainer").show();
                console.error('Ошибка:', error);
            });
    }
}

function handleKeyInputChange() {
    if ($("#keyInput").val() === "") {
        $("#keyInput").addClass("is-invalid");
    } else {
        console.log('eee')
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
    axios.get('/order/getAll', {headers: {Authorization: key}})
        .then(response => {
            response.data.forEach(element => {
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

                let newElement = document.createElement("div");
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

    axios.delete(`/order/${id}`, {headers: {Authorization: getCookie('jsec')}})
        .then(response => {
            console.log(response)
        });

    orderElements.forEach(c => {
        if (c.getAttribute('data-id') == id){
            console.log(c);

            document.getElementById("orders").removeChild(c.parentNode)
        }
    });
}
