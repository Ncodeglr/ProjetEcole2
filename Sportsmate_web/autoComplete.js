document.addEventListener("DOMContentLoaded", () => {
    const sport_input = document.getElementById("sport_input1");

    sport_input.addEventListener("input", function() {
        const query = this.value;

        if (!query) {
            closeAllLists();
            return false;
        }

        fetch(`get_sports.php?q=${query}`)
            .then(response => response.json())
            .then(data => {
                closeAllLists();
                if (data.length > 0) {
                    const list = document.createElement("div");
                    list.setAttribute("id", this.id + "-autocomplete-list");
                    list.setAttribute("class", "autocomplete_items");
                    this.parentNode.appendChild(list);

                    data.forEach(item => {
                        const element = document.createElement("div");
                        element.innerHTML = item;
                        element.addEventListener("click", function() {
                            sport_input.value = item;
                            closeAllLists();
                        });
                        list.appendChild(element);
                    });
                }
            })
            .catch(error => console.error("Erreur de fetch des sports:", error));
    });

    function closeAllLists() {
        const items = document.getElementsByClassName("autocomplete_items");
        for (let i = 0; i < items.length; i++) {
            items[i].parentNode.removeChild(items[i]);
        }
    }

    document.addEventListener("click", function(e) {
        if (e.target !== sport_input) {
            closeAllLists();
        }
    });
});

//deuxième input, à améliorer plutot que de répéter le code 

document.addEventListener("DOMContentLoaded", () => {
    const sport_input = document.getElementById("sport_input2");

    sport_input.addEventListener("input", function() {
        const query = this.value;

        if (!query) {
            closeAllLists();
            return false;
        }

        fetch(`get_sports.php?q=${query}`)
            .then(response => response.json())
            .then(data => {
                closeAllLists();
                if (data.length > 0) {
                    const list = document.createElement("div");
                    list.setAttribute("id", this.id + "-autocomplete-list");
                    list.setAttribute("class", "autocomplete_items");
                    this.parentNode.appendChild(list);

                    data.forEach(item => {
                        const element = document.createElement("div");
                        element.innerHTML = item;
                        element.addEventListener("click", function() {
                            sport_input.value = item;
                            closeAllLists();
                        });
                        list.appendChild(element);
                    });
                }
            })
            .catch(error => console.error("Erreur de fetch des sports:", error));
    });

    function closeAllLists() {
        const items = document.getElementsByClassName("autocomplete_items");
        for (let i = 0; i < items.length; i++) {
            items[i].parentNode.removeChild(items[i]);
        }
    }

    document.addEventListener("click", function(e) {
        if (e.target !== sport_input) {
            closeAllLists();
        }
    });
});
// troisième inout

document.addEventListener("DOMContentLoaded", () => {
    const sport_input = document.getElementById("sport_input3");

    sport_input.addEventListener("input", function() {
        const query = this.value;

        if (!query) {
            closeAllLists();
            return false;
        }

        fetch(`get_sports.php?q=${query}`)
            .then(response => response.json())
            .then(data => {
                closeAllLists();
                if (data.length > 0) {
                    const list = document.createElement("div");
                    list.setAttribute("id", this.id + "-autocomplete-list");
                    list.setAttribute("class", "autocomplete_items");
                    this.parentNode.appendChild(list);

                    data.forEach(item => {
                        const element = document.createElement("div");
                        element.innerHTML = item;
                        element.addEventListener("click", function() {
                            sport_input.value = item;
                            closeAllLists();
                        });
                        list.appendChild(element);
                    });
                }
            })
            .catch(error => console.error("Erreur de fetch des sports:", error));
    });

    function closeAllLists() {
        const items = document.getElementsByClassName("autocomplete_items");
        for (let i = 0; i < items.length; i++) {
            items[i].parentNode.removeChild(items[i]);
        }
    }

    document.addEventListener("click", function(e) {
        if (e.target !== sport_input) {
            closeAllLists();
        }
    });
});