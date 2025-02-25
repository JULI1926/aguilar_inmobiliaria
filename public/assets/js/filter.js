document.addEventListener('DOMContentLoaded', function () {
    const departmentSelect = document.getElementById('department-select');
    const citySelect = document.getElementById('city-select');
    const neighborhoodSelect = document.getElementById('neighborhood-select');

    function handleSelectChange() {
        if (departmentSelect.value) {
            citySelect.disabled = true;
            neighborhoodSelect.disabled = true;
        } else if (citySelect.value) {
            departmentSelect.disabled = true;
            neighborhoodSelect.disabled = true;
        } else if (neighborhoodSelect.value) {
            departmentSelect.disabled = true;
            citySelect.disabled = true;
        } else {
            departmentSelect.disabled = false;
            citySelect.disabled = false;
            neighborhoodSelect.disabled = false;
        }
    }

    departmentSelect.addEventListener('change', handleSelectChange);
    citySelect.addEventListener('change', handleSelectChange);
    neighborhoodSelect.addEventListener('change', handleSelectChange);
});

