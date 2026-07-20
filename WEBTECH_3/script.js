document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // High fidelity functional verification mapping logic
    const validators = {
        fullName: (val) => val.trim() !== '' ? '' : 'Full name configuration rule violation.',
        rollNumber: (val) => /^[a-zA-Z0-9]+$/.test(val) ? '' : 'Roll syntax allows standard alphanumeric values only.',
        email: (val) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? '' : 'Invalid cryptographic mail pattern schema.',
        mobileNumber: (val) => /^\d{10}$/.test(val) ? '' : 'Metric configuration error: Requires exactly 10 digits.',
        password: (val) => val.length >= 8 ? '' : 'Security constraint: Minimum 8 configuration characters.',
        confirmPassword: (val) => val === document.getElementById('password').value ? '' : 'Identity token parity mismatch.',
        dob: (val) => val !== '' ? '' : 'Chronological marker timestamp is required.',
        department: (val) => val !== '' ? '' : 'System require: Select primary academic department.'
    };

    // Tracking list mapping targeted individual rules indicators on the Sidebar HUD
    const sidebarElements = {
        fullName: document.getElementById('rule-name'),
        rollNumber: document.getElementById('rule-roll'),
        email: document.getElementById('rule-email'),
        mobileNumber: document.getElementById('rule-mobile'),
        password: document.getElementById('rule-password'),
        confirmPassword: document.getElementById('rule-match'),
        dob: document.getElementById('rule-dob'),
        department: document.getElementById('rule-dept')
    };

    // Core processor handling real-time interactive rule item updating status
    function validateField(inputElement) {
        const id = inputElement.id;
        if (!validators[id]) return true;

        const errorMessage = validators[id](inputElement.value);
        const parent = inputElement.parentElement;
        const errorDisplay = parent.querySelector('.error-msg');
        const ruleItem = sidebarElements[id];

        if (errorMessage) {
            parent.classList.add('invalid');
            errorDisplay.textContent = errorMessage;
            
            if (ruleItem) {
                ruleItem.classList.remove('valid');
                ruleItem.classList.add('invalid-active');
            }
            return false;
        } else {
            parent.classList.remove('invalid');
            errorDisplay.textContent = '';
            
            if (ruleItem) {
                ruleItem.classList.remove('invalid-active');
                ruleItem.classList.add('valid');
            }
            return true;
        }
    }

    // Checking layout complex fields like radio tiles custom inputs
    function validateGender() {
        const checkedGender = document.querySelector('input[name="gender"]:checked');
        const errorDisplay = document.getElementById('genderError');
        const ruleItem = document.getElementById('rule-gender');

        if (!checkedGender) {
            errorDisplay.textContent = 'Gender option target must be selected.';
            errorDisplay.style.opacity = '1';
            errorDisplay.style.transform = 'translateY(0)';
            if (ruleItem) {
                ruleItem.classList.remove('valid');
                ruleItem.classList.add('invalid-active');
            }
            return false;
        } else {
            errorDisplay.textContent = '';
            errorDisplay.style.opacity = '0';
            if (ruleItem) {
                ruleItem.classList.remove('invalid-active');
                ruleItem.classList.add('valid');
            }
            return true;
        }
    }

    // Attaching dynamic blur/input system event logic paths
    form.querySelectorAll('input, select').forEach(element => {
        if (element.type !== 'radio') {
            element.addEventListener('input', () => validateField(element));
            element.addEventListener('blur', () => validateField(element));
        }
    });

    // Handle instant feedback loops on radio inputs selection click matches
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', validateGender);
    });

    function toggleModal(show) {
        if (show) {
            modal.classList.add('active');
        } else {
            modal.classList.remove('active');
            form.reset();
            // Clear all sidebar states back to baseline
            document.querySelectorAll('.rule-item').forEach(item => {
                item.classList.remove('valid', 'invalid-active');
            });
        }
    }

    closeModalBtn.addEventListener('click', () => toggleModal(false));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        form.querySelectorAll('input:not([type="radio"]), select').forEach(element => {
            const isValid = validateField(element);
            if (!isValid) isFormValid = false;
        });

        if (!validateGender()) isFormValid = false;

        if (isFormValid) {
            toggleModal(true);
        }
    });
});