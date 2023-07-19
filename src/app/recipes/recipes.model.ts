import { Ingredient } from "../shared/ingredient.model";

export class Recipes {
    public name: string;
    public description: string;
    public imageUrl: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, img: string, ing: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imageUrl = img;
        this.ingredients = ing;
    }

}