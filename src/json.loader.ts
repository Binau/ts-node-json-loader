import * as FS from 'fs';
import {JsonLoaderOpt} from './json.loader.opt';
import {FileUtils} from 'ts-all-utils';


export class JsonLoader {


    public static async loadJsonFromFile<T>(opts: JsonLoaderOpt): Promise<T> {

        // Verification nom du fichier a charger
        if (!opts || !opts.jsonFileUrl) {
            throw 'Url du fichier json a charger non fournie';
        }

        let conf = {};
        // Si le fichier de conf n'existe pas,
        if (!FS.existsSync(opts.jsonFileUrl)) {
            // Creation depuis le template
            if (opts.createJsonFromTemplate) {
                conf = opts.createJsonFromTemplate;
                await FileUtils.writeJson(opts.jsonFileUrl, conf);
            }
        } else {
            conf = await FileUtils.loadJson(opts.jsonFileUrl, 'utf8');
        }

        // Application des valeurs par defaut
        if (conf && opts && opts.defaultValues) {
            for (let key of Object.keys(opts.defaultValues)) {
                if (conf[key] === undefined) {
                    conf[key] = opts.defaultValues[key];
                }
            }
        }

        return conf as T;
    }
}