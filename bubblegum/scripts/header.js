const header = document.getElementById('header');
const headerLogo = document.getElementById('header-logo');

const modifyHeader = () => {
	if (window.scrollY < 25) {
		let offset = Math.round(window.scrollY);
		header.style = `border-bottom-color: rgb(${255 - offset}, ${255 - offset}, ${255 - offset}); height: ${50 - offset}px;`
		headerLogo.style = `max-height: ${50 - offset}px;`
	}
	else {
		header.style = 'border-bottom-color: rgb(230, 230, 230); height: 40px;'
		headerLogo.style = 'max-height: 40px;'
	}
}

let wait = false;

const scrollThrottle = () => {
	setTimeout(() => {
		wait = false
	}, 40);
};

const scrollSync = () => {
	setTimeout(() => {
		modifyHeader();
	}, 80);
};


window.onscroll = () => {
	if (wait) return;

	wait = true;

	clearTimeout(scrollThrottle);

	modifyHeader();

	scrollThrottle();

	scrollSync();
};
