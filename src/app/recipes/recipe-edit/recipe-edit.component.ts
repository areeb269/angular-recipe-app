import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe-service.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipes } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id!: number;
  editMode = false;
  recipeForm: FormGroup;
  recipes: Recipes[];

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  onSubmit() {
    // console.log(this.recipeForm)
    // const newRecipe = new Recipes(
    //   this.recipeForm.value['formName'],
    //   this.recipeForm.value['formUrl'],
    //   this.recipeForm.value['formDescription'],
    //   this.recipeForm.value['formIngredients'],
    // ) is the same as this.recipeForm.value

    if (this.editMode) {
      console.log(this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  ngOnInit() {
    //GET ID OF RECIPE CLICKED ON 
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      })
  }

  //INITIALIZE REACTIVE FORM TO EDIT RECIPE
  private initForm() {
    let recipeName = '';
    let recipeURL = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      //IF IN EDIT MODE GET THE INFO ABOUT RECIPE TO BE EDITED
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeURL = recipe.imageUrl;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      //SET NAME OF FORM DATA AND ASSIGN VALUES TO IT
      'name': new FormControl(recipeName, Validators.required),
      'imageUrl': new FormControl(recipeURL, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  //ADD NEW INGREDIENT OF A RECIPE
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      }))
  }

  onCancel() {
    //-------------------↓ defining the path to where we need to navigate
    this.router.navigate(['../../'], { relativeTo: this.route })
    //------------------------------↑ relative to : current path 
  }

  //DELETE SINGLE INGREDIENT FROM LIST OF INGREDIENTS WITH EACH RECIPE
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // (<FormArray>this.recipeForm.get('ingredients')).clear();
  }
}
