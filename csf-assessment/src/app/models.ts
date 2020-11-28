export const NEWS_API = 'newsapi.org'

export const COUNTRIES = 'ae;ar;at;au;be;bg;br;ca;ch;cn;co;cu;cz;de;eg;fr;gb;gr;hk;hu;id;ie;il;in;it;jp;kr;lt;lv;ma;mx;my;ng;nl;no;nz;ph;pl;pt;ro;rs;ru;sa;se;sg;si;sk;th;tr;tw;ua;us;ve;za'

export interface ApiKeys {
	id: string;
	secret: string;
}

export interface Country {
	code: string;
	name: string;
	flag: string;
}

export interface Article {
	publishedAt: string;
	code: string;
	saved: boolean;
	timestamp: number;
	title: string;
	source: string;
	author: string;
	description: string;
	url: string;
	urlToImage: string;
	content: string;
}
