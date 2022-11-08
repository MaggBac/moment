let imageElement = [...document.querySelectorAll('#splashImg')];

fetch(
	'https://api.unsplash.com/photos/random/?client_id=3v-pvRqlI8MZrJL7fEkV45Ba2M-Jw-8Q-CBZrBE0-qc&count=3'
)
	.then((response) => response.json())
	.then((data) =>
		imageElement.map((i) => {
			i.src = data.urls.regular;
			imageElement.alt = data.alt_description;
		})
	)
	.catch((error) => console.log('Error:' + error));

const navBtn = document.querySelector('.burger-btn');
const allNavItems = document.querySelectorAll('.nav-link');
const allNavItemsD = document.querySelectorAll('.nav-linkD');
const nav = document.querySelector('.div');
const navDesktop = document.querySelector('.nav');
const textBig = document.querySelector('.text');
const footerYear = document.querySelector('.footer-year');

const handleNav = () => {
	nav.classList.toggle('nav-mobile--active');

	allNavItems.forEach((val) => {
		val.addEventListener('click', () => {
			nav.classList.remove('nav-mobile--active');
		});
	});
	handleNavUp();
	handleNavText();
};

const handleNavUp = () => {
	navDesktop.classList.toggle('nav-desktop--isactive');

	allNavItemsD.forEach((val) => {
		val.addEventListener('click', () => {
			navDesktop.classList.toggle('nav-desktop--isactive');
		});
	});
};

const handleNavText = () => {
	textBig.classList.toggle('--active');
	textBig.addEventListener('click', () => {
		textBig.classList.toggle('--active');
	});
};

//form

const multiStepForm = document.querySelector('[data-multi-step]');
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')];
let currentStep = formSteps.findIndex((step) => {
	return step.classList.contains('active');
});

if (currentStep < 0) {
	currentStep = 0;
	showCurrentStep();
}

multiStepForm.addEventListener('click', (e) => {
	let incrementor;
	if (e.target.matches('[data-next]')) {
		incrementor = 1;
	} else if (e.target.matches('[data-previous]')) {
		incrementor = -1;
	}

	if (incrementor == null) return;

	const inputs = [...formSteps[currentStep].querySelectorAll('input')];
	const allValid = inputs.every((input) => input.reportValidity());
	if (allValid) {
		currentStep += incrementor;
		showCurrentStep();
	}
});

formSteps.forEach((step) => {
	step.addEventListener('animationend', (e) => {
		formSteps[currentStep].classList.remove('hide');
		e.target.classList.toggle('hide', !e.target.classList.contains('active'));
	});
});

function showCurrentStep() {
	formSteps.forEach((step, index) => {
		step.classList.toggle('active', index === currentStep);
	});
}

//year

const CurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerHTML = year;
};

CurrentYear();
navBtn.addEventListener('click', handleNav);

//animation

const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

tl.to('.hide-text', { y: '0%', duration: 1, stagger: 0.25 });
tl.to('.slider', { y: '-100%', duration: 1.5, delay: 0.5 });
tl.to('.intro', { y: '-100%', duration: 1 });
tl.fromTo('nav', { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo('.big-text', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.5');

//pagination

const paginationNumbers = document.getElementById('pagination-numbers');
const listItems = [...document.getElementsByClassName('pagination__item')];
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

const paginationLimit = 4;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
	button.classList.add('disabled');
	button.setAttribute('disabled', true);
};

const enableButton = (button) => {
	button.classList.remove('disabled');
	button.removeAttribute('disabled');
};

const handlePageButtonsStatus = () => {
	if (currentPage === 1) {
		disableButton(prevButton);
	} else {
		enableButton(prevButton);
	}

	if (pageCount === currentPage) {
		disableButton(nextButton);
	} else {
		enableButton(nextButton);
	}
};

const handleActivePageNumber = () => {
	document.querySelectorAll('.pagination-number').forEach((button) => {
		button.classList.remove('active');
		const pageIndex = Number(button.getAttribute('page-index'));
		if (pageIndex == currentPage) {
			button.classList.add('active');
		}
	});
};

const appendPageNumber = (index) => {
	const pageNumber = document.createElement('button');
	pageNumber.className = 'pagination-number';
	pageNumber.innerHTML = index;
	pageNumber.setAttribute('page-index', index);
	pageNumber.setAttribute('aria-label', 'Page ' + index);

	paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
	for (let i = 1; i <= pageCount; i++) {
		appendPageNumber(i);
	}
};

const setCurrentPage = (pageNum) => {
	currentPage = pageNum;

	handleActivePageNumber();
	handlePageButtonsStatus();

	const prevRange = (pageNum - 1) * paginationLimit;
	const currRange = pageNum * paginationLimit;

	listItems.forEach((item, index) => {
		item.classList.add('hiddenPage');
		if (index >= prevRange && index < currRange) {
			item.classList.remove('hiddenPage');
		}
	});
};

window.addEventListener('load', () => {
	getPaginationNumbers();
	setCurrentPage(1);

	prevButton.addEventListener('click', () => {
		setCurrentPage(currentPage - 1);
	});

	nextButton.addEventListener('click', () => {
		setCurrentPage(currentPage + 1);
	});

	document.querySelectorAll('.pagination-number').forEach((button) => {
		const pageIndex = Number(button.getAttribute('page-index'));

		if (pageIndex) {
			button.addEventListener('click', () => {
				setCurrentPage(pageIndex);
			});
		}
	});
});
