import {assert} from 'chai';
import {JsonLoader} from '../src/json.loader';
import {promises} from 'fs';


describe('Tests - 01', async () => {
    describe('Chargement simple', async () => {

        it('Fichier existant', async () => {

            const fileUrl = `${__dirname}/test1.json`;
            const vals = await JsonLoader.loadJsonFromFile<any>({jsonFileUrl: fileUrl});

            assert.isOk(vals);
            assert.strictEqual(vals.val1, 'str1');
            assert.strictEqual(vals.val2, 'str2');
            assert.strictEqual(vals.val3, 35);

        });

        it('Fichier inexistant', async () => {

            const fileUrl = `${__dirname}/testX.json`;
            const vals = await JsonLoader.loadJsonFromFile({jsonFileUrl: fileUrl});

            assert.deepStrictEqual({}, vals);

        });

    });

    describe('Template', async () => {

        it('Fichier existant', async () => {

            const fileUrl = `${__dirname}/test1.json`;
            const vals = await JsonLoader.loadJsonFromFile<any>({
                jsonFileUrl: fileUrl,
                createJsonFromTemplate: {val3: 55, val4: 54}
            });

            assert.isOk(vals);
            assert.strictEqual(vals.val1, 'str1');
            assert.strictEqual(vals.val2, 'str2');
            assert.strictEqual(vals.val3, 35);
            assert.strictEqual(vals.val4, undefined);

        });

        it('Fichier inexistant', async () => {

            const fileUrl = `${__dirname}/testX.json`;
            const vals = await JsonLoader.loadJsonFromFile<any>({
                jsonFileUrl: fileUrl,
                createJsonFromTemplate: {val3: 55, val4: 54}
            });

            assert.isOk(vals);
            assert.strictEqual(vals.val1, undefined);
            assert.strictEqual(vals.val2, undefined);
            assert.strictEqual(vals.val3, 55);
            assert.strictEqual(vals.val4, 54);

            const fileStat = await promises.stat(fileUrl);
            assert.isOk(fileStat.isFile());

            await promises.unlink(fileUrl);
        });

    });

    describe('Defaults', async () => {
        it('Fichier existant', async () => {

            const fileUrl = `${__dirname}/test1.json`;
            const vals = await JsonLoader.loadJsonFromFile<any>({
                jsonFileUrl: fileUrl,
                defaultValues: {val3: 55, val4: 54}
            });

            assert.isOk(vals);
            assert.strictEqual(vals.val1, 'str1');
            assert.strictEqual(vals.val2, 'str2');
            assert.strictEqual(vals.val3, 35);
            assert.strictEqual(vals.val4, 54);

        });
        it('Fichier inexistant, pas de template', async () => {

            const fileUrl = `${__dirname}/testX.json`;
            const vals = await JsonLoader.loadJsonFromFile<any>({
                jsonFileUrl: fileUrl,
                defaultValues: {val3: 55, val4: 54}
            });

            assert.isOk(vals);
            assert.strictEqual(vals.val1, undefined);
            assert.strictEqual(vals.val2, undefined);
            assert.strictEqual(vals.val3, 55);
            assert.strictEqual(vals.val4, 54);

        });
        it('Fichier inexistant, template', async () => {

            const fileUrl = `${__dirname}/testX.json`;
            const vals = await JsonLoader.loadJsonFromFile<any>({
                jsonFileUrl: fileUrl,
                createJsonFromTemplate: {val2: 8, val3: 'ploup'},
                defaultValues: {val3: 55, val4: 54}
            });

            assert.isOk(vals);
            assert.strictEqual(vals.val1, undefined);
            assert.strictEqual(vals.val2, 8);
            assert.strictEqual(vals.val3, 'ploup');
            assert.strictEqual(vals.val4, 54);


            await promises.unlink(fileUrl);
        });


    });


});
