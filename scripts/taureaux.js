document.addEventListener('DOMContentLoaded', function () {
    const taureauxList = document.getElementById('taureaux-list');

    // Charger les taureaux depuis le localStorage
    const taureaux = JSON.parse(localStorage.getItem('taureaux')) || [];
    taureaux.forEach((bull, index) => {
        const taureauItem = document.createElement('div');
        taureauItem.innerHTML = `
            <img src="${bull.photo}" alt="Taureau ${bull.numero}" width="100">
            <p><strong>Numéro:</strong> ${bull.numero}</p>
            <p><strong>Age:</strong> ${bull.age}</p>
            <p><strong>Gendre:</strong> ${bull.gendre}</p>
            <p><strong>Description:</strong> ${bull.description}</p>
            <form id="price-form-${index}">
                <label for="name-${index}">Nom:</label>
                <input type="text" id="name-${index}" name="name" required>
                <label for="phone-${index}">Numéro de téléphone:</label>
                <input type="tel" id="phone-${index}" name="phone" pattern="[0-9]{10}" required>
                <label for="price-${index}">Estimer un prix de vente:</label>
                <input type="number" id="price-${index}" name="price" required>
                <button type="submit">Envoyer</button>
            </form>
            <p id="message-${index}" class="message"></p>
        `;
        taureauxList.appendChild(taureauItem);

        const priceForm = document.getElementById(`price-form-${index}`);
        priceForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = priceForm.name.value;
            const phone = priceForm.phone.value;
            const price = priceForm.price.value;
            const message = document.getElementById(`message-${index}`);

            if (name && phone && price) {
                // Envoyer la suggestion de prix à l'admin (stockage local pour l'exemple)
                let suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
                suggestions.push({
                    numero: bull.numero,
                    name: name,
                    phone: phone,
                    price: price,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('suggestions', JSON.stringify(suggestions));

                // Afficher le message de confirmation
                message.textContent = 'Votre suggestion de prix a été envoyée avec succès!';
                message.style.color = 'green';
                priceForm.reset();
            } else {
                message.textContent = 'Veuillez remplir tous les champs!';
                message.style.color = 'red';
            }
        });
    });
});
