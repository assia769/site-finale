document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-bull-form');
    const message = document.getElementById('message');
    const bullList = document.getElementById('bull-list');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const photo = form.photo.files[0];
        const age = form.age.value;
        const numero = form.numero.value;
        const gendre = form.gendre.value;
        const description = form.description.value;

        if (photo && age && numero && gendre && description) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${e.target.result}" alt="Taureau ${numero}" width="100">
                    <p><strong>Numéro:</strong> ${numero}</p>
                    <p><strong>Age:</strong> ${age}</p>
                    <p><strong>Gendre:</strong> ${gendre}</p>
                    <p><strong>Description:</strong> ${description}</p>
                `;
                bullList.appendChild(listItem);

                message.textContent = 'Taureau ajouté avec succès!';
                message.style.color = 'green';
                form.reset();
            };
            reader.readAsDataURL(photo);
        } else {
            message.textContent = 'Veuillez remplir tous les champs!';
            message.style.color = 'red';
        }
    });
});
