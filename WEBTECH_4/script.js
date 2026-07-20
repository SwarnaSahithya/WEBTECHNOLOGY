document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('main .section, main section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Portfolio Form Rule Engine Verification Maps following rules exactly:
    const fieldValidators = {
        name: (val) => val.trim() !== '' ? '' : 'Name cannot be empty.',
        email: (val) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? '' : 'Email must be valid.',
        subject: (val) => val.trim().length >= 5 ? '' : 'Subject should contain at least 5 characters.',
        message: (val) => val.trim().length >= 20 ? '' : 'Message should contain at least 20 characters.'
    };

    // Live Field Evaluator Logic
    function evalField(fieldElement) {
        const id = fieldElement.id;
        if (!fieldValidators[id]) return true;

        const errorOutput = fieldValidators[id](fieldElement.value);
        const structureParent = fieldElement.parentElement;
        const targetBadge = structureParent.querySelector('.error-badge');

        if (errorOutput) {
            structureParent.classList.add('invalid');
            targetBadge.textContent = errorOutput;
            return false;
        } else {
            structureParent.classList.remove('invalid');
            targetBadge.textContent = '';
            return true;
        }
    }

    // Toggle modal overlay visibility status
    function setModalState(isOpen) {
        if(isOpen) {
            successModal.classList.add('active');
        } else {
            successModal.classList.remove('active');
            contactForm.reset();
        }
    }

    closeModalBtn.addEventListener('click', () => setModalState(false));

    // Handle form intercept sequences with premium validation feedback
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let passesVerification = true;

        contactForm.querySelectorAll('input, textarea').forEach(element => {
            const result = evalField(element);
            if (!result) passesVerification = false;
        });

        if (passesVerification) {
            // Displays beautiful premium success modal instead of native popups
            setModalState(true);
        }
    });

    // Navigation active link tracking script updates
    window.addEventListener('scroll', () => {
        let currentActiveSection = '';
        
        sections.forEach(sec => {
            const depthTop = sec.offsetTop;
            const sizeHeight = sec.clientHeight;
            if (pageYOffset >= (depthTop - sizeHeight / 3.5)) {
                currentActiveSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActiveSection)) {
                link.classList.add('active');
            }
        });
    });
});