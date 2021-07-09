import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface News_General {
    img_center: string;
}
export interface Article_info {
    _id?: string;
    sub_header: string;
    header: string;
    date: Date;
    summary: string[];
    main_text: string;
    state?: FadeState;
    isSummary?: boolean;
}

export type FadeState = 'visible' | 'hidden';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class NewsComponent {
    // spec
    specs_news_general: News_General;
    
    // article info
    articles_array: Article_info[] = [];
    article_summary_preview: string = '';
    article_info: Article_info = {
        sub_header: '',
        header: '',
        date: new Date(),
        summary: [],
        main_text: ''
    };
    
    state: FadeState;

    constructor(private modalService: NgbModal,
                private http: HttpClient,
                private router: Router) {}
    
    ngOnInit(): void {
        this.specs_news_general = {
            img_center: "assets/img/portrait/avatars/avatar-about.png"
        }
        
        this.http.get<Article_info[]>('http://51.91.23.157:500/news/articles')
            .subscribe((data: Article_info[]) => {
                this.articles_array = data;
                this.articles_array.forEach((article, i) => {
                    article.state = 'hidden'
                    article.isSummary = i === 0 ? true : false;
                });
            },
            (err) => {
                this.router.navigate(['/pages/maintenance']);
            }
        );
    }
    
    openXl(content): void {
        this.modalService.open(content);
    }
    
    addArticleSummary(summary: string): void {
        this.article_info.summary.push(summary);
        this.article_summary_preview = '';
    }
    
    saveArticle(): void {
        this.articles_array.push(this.article_info);
        this.http.post<Article_info>('http://51.91.23.157:500/news/postArticle', this.article_info)
            .subscribe(() => {
            }, (err) => {
                this.router.navigate(['/pages/maintenance']);
            }
        );
        this.article_info = {
            sub_header: '',
            header: '',
            date: new Date(),
            summary: [],
            main_text: ''
        }
        this.modalService.dismissAll();
    }
    
    showArticle(event: any, article: Article_info): void {
        const elementHeight: number = event.target.parentElement.previousElementSibling.scrollHeight;
        event.target.parentElement.previousElementSibling.style.height = `${elementHeight}px`;
        event.target.parentElement.previousElementSibling.style.opacity = 1;
        article.state = 'visible';
    }
    
    showAnotherArticle(event: any, article: Article_info): void {
        const elementHeight: number = event.path[6].nextElementSibling.scrollHeight;
        event.path[6].nextElementSibling.style.height = `${elementHeight}px`;
        event.path[6].nextElementSibling.style.opacity = 1;
        article.isSummary = true;
    }
    
    getArticleById(id: string): void {
        this.http.get<Article_info>(`http://51.91.23.157:500/news/article?id=${id}`)
            .subscribe((data: Article_info) => {
                console.log(data);
            })
    }
}
