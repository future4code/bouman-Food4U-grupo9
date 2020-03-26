export class Recipe {
    constructor(
        private id: string,
        private title: string,
        private recipeDescription: string,
        private creationDate: Date,
        private userId: string    
    ) {}
    
    public getId(): string {
      return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getRecipeDescription(): string {
        return this.recipeDescription;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }
    
    public getUserId(): string {
        return this.userId;
    }
  }