import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotNullPipe } from './not-null.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
    declarations: [
        NotNullPipe,
        TruncatePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NotNullPipe,
        TruncatePipe
    ]
})
export class PipesModule { }