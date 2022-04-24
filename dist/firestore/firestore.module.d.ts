import { DynamicModule } from '@nestjs/common';
import { Settings } from '@google-cloud/firestore';
declare type FirestoreModuleOptions = {
    imports: any[];
    useFactory: (...args: any[]) => Settings;
    inject: any[];
};
export declare class FirestoreModule {
    static forRoot(options: FirestoreModuleOptions): DynamicModule;
}
export {};
