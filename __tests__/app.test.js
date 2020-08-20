
require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  let token;

  beforeAll(async done => {
    execSync('npm run setup-db');

    client.connect();

    const signInData = await fakeRequest(app)
      .post('/auth/signup')
      .send({
        email: 'jon@user.com',
        password: '1234'
      });

    token = signInData.body.token;

    return done();
  });

  afterAll(done => {
    return client.end(done);
  });

  test('returns search results from cocktail api', async(done) => {
    const expectation =
      {
        "drinks": [
          {
            "idDrink": "17241",
            "strDrink": "Zombie",
            "strDrinkAlternate": null,
            "strDrinkES": null,
            "strDrinkDE": null,
            "strDrinkFR": null,
            "strDrinkZH-HANS": null,
            "strDrinkZH-HANT": null,
            "strTags": null,
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": null,
            "strAlcoholic": "Alcoholic",
            "strGlass": "Hurricane glass",
            "strInstructions": "\r\nBlend at high speed for no more than 5 seconds.\r\n\r\nPour into a glass, add ice cubes to fill, then add the garnish.\r\n\r\n*Donn’s mix: Bring 3 crushed cinnamon sticks, 1 cup of sugar and 1 cup of water to a boil, stirring until the sugar is dissolved.\r\n\r\nSimmer for 2 minutes, then remove from the heat and let sit for at least 2 hours before straining into a clean glass bottle.\r\n\r\nThen add 1 part of the syrup and 2 parts of fresh grapefruit juice together.",
            "strInstructionsES": null,
            "strInstructionsDE": "Mixen Sie mit hoher Geschwindigkeit für nicht mehr als 5 Sekunden. In ein Glas gießen, Eiswürfel zum Füllen hinzufügen, dann die Garnitur hinzufügen. *Donnas Mix: 3 zerdrückte Zimtstangen, 1 Tasse Zucker und 1 Tasse Wasser unter Rühren zum Kochen bringen, bis der Zucker gelöst ist. 2 Minuten köcheln lassen, dann vom Herd nehmen und mindestens 2 Stunden ruhen lassen, bevor man in eine saubere Glasflasche abseiht. Dann 1 Teil des Sirups und 2 Teile frischen Grapefruitsaft dazugeben.",
            "strInstructionsFR": null,
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/2en3jk1509557725.jpg",
            "strIngredient1": "Rum",
            "strIngredient2": "Gold rum",
            "strIngredient3": "151 proof rum",
            "strIngredient4": "Pernod",
            "strIngredient5": "Grenadine",
            "strIngredient6": "Lime Juice",
            "strIngredient7": "Angostura Bitters",
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "1 1/2 oz",
            "strMeasure2": "1 1/2 oz",
            "strMeasure3": "1 oz",
            "strMeasure4": "1 tsp",
            "strMeasure5": "1 tsp",
            "strMeasure6": "1 tsp",
            "strMeasure7": "1 drop",
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strCreativeCommonsConfirmed": "No",
            "dateModified": "2017-11-01 17:35:26"
          }
        ]
      };

    const data = await fakeRequest(app)
      .get('/search?s=zombie')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);

    done();
  });
});
