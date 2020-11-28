import {Router} from '@angular/router';

export class BaseComponent {
	constructor(private router: Router) { }

	navigate(path: string[]) {
		this.router.navigate(path)
	}

	navigateToCountryList() {
		this.navigate(['/'])
	}

	navigateToSettings() {
		this.navigate(['/', 'settings'])
	}

	navigateToTopHeadlines(country: string) {
		this.navigate([ '/top-headlines', country ])
	}

}
