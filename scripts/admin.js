document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-bull-form');
    const message = document.getElementById('message');
    const bullList = document.getElementById('bull-list');
    const suggestionsTable = document.getElementById('suggestions-table');

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
                const bull = {
                    photo: e.target.result,
                    age: age,
                    numero: numero,
                    gendre: gendre,
                    description: description
                };

                // Sauvegarder le taureau dans le localStorage
                let taureaux = JSON.parse(localStorage.getItem('taureaux')) || [];
                taureaux.push(bull);
                localStorage.setItem('taureaux', JSON.stringify(taureaux));

                // Afficher le taureau dans la liste
                addBullToList(bull, taureaux.length - 1);

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

    // Charger les taureaux existants
    const taureaux = JSON.parse(localStorage.getItem('taureaux')) || [];
    taureaux.forEach((bull, index) => {
        addBullToList(bull, index);
    });

    // Charger les suggestions existantes et peupler le tableau
    const suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    suggestions.forEach(suggestion => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${suggestion.numero}</td>
            <td>${suggestion.name}</td>
            <td>${suggestion.phone}</td>
            <td>${suggestion.price} MAD</td>
            <td>${new Date(suggestion.timestamp).toLocaleString()}</td>
            <td><button class="delete-suggestion" data-index="${suggestions.indexOf(suggestion)}">Supprimer</button></td>
        `;
        suggestionsTable.appendChild(tableRow);
    });

    // Écouter les clics sur les boutons de suppression des suggestions
    suggestionsTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-suggestion')) {
            const index = event.target.dataset.index;
            deleteSuggestion(index);
        }
    });

    function addBullToList(bull, index) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${bull.photo}" alt="Taureau ${bull.numero}" width="100">
            <p><strong>Numéro:</strong> ${bull.numero}</p>
            <p><strong>Age:</strong> ${bull.age}</p>
            <p><strong>Gendre:</strong> ${bull.gendre}</p>
            <p><strong>Description:</strong> ${bull.description}</p>
            <button class="delete-bull" data-index="${index}">Supprimer</button>
        `;
        bullList.appendChild(listItem);

        listItem.querySelector('.delete-bull').addEventListener('click', function () {
            deleteBull(index);
        });
    }

    function deleteBull(index) {
        let taureaux = JSON.parse(localStorage.getItem('taureaux')) || [];
        taureaux.splice(index, 1);
        localStorage.setItem('taureaux', JSON.stringify(taureaux));
        bullList.innerHTML = '';
        taureaux.forEach((bull, index) => {
            addBullToList(bull, index);
        });
    }

    function deleteSuggestion(index) {
        let suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
        suggestions.splice(index, 1);
        localStorage.setItem('suggestions', JSON.stringify(suggestions));

        // Recharger le tableau des suggestions
        suggestionsTable.innerHTML = `
            <thead>
                <tr>
                    <th>Numéro de Taureau</th>
                    <th>Nom</th>
                    <th>Téléphone</th>
                    <th>Prix Suggéré (MAD)</th>
                    <th>Date</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        suggestions.forEach(suggestion => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${suggestion.numero}</td>
                <td>${suggestion.name}</td>
                <td>${suggestion.phone}</td>
                <td>${suggestion.price} MAD</td>
                <td>${new Date(suggestion.timestamp).toLocaleString()}</td>
                <td><button class="delete-suggestion" data-index="${suggestions.indexOf(suggestion)}">Supprimer</button></td>
            `;
            suggestionsTable.appendChild(tableRow);
        });
    }
});
