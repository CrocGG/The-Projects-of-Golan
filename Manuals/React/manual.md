# Introduction: General React Programing Skeleton: 
**Form**: 
*Src*:
1) assets -> pictures we want to implement

2) components -> 
- app(App.css, App.tsx)  |
- auth: auth(Auth.tsx, AuthContent.ts), login(Login.css, Login.tsx) |
- common: spinner(Spinner.css, Spinner.tsx), spinner-button(SpinnerButton.css, SpinnerButton.tsx) |
- follows: follow(Follow.css, Follow.tsx), followers(Followers.css, Followers.tsx), following(Following.css, Following.tsx) |
- layout: footer(Footer.css,Footer.tsx), header(Header.css,Header.tsx), layout(Layout.css,Layout.tsx), main(Main.tsx), not-found(NotFound.css,NotFound.tsx), nav-bar(NavBar.css,NavBar.tsx), routing(Routing.tsx) |
- posts: comments: comment(PostComment.css,PostComment.tsx), new(NewComment.css,NewComment.tsx), - post-comments(PostComments.css,PostComments.tsx)/ edit(EditPost.css,EditPost.tsx), feed(Feed.css,Feed.tsx), new(NewPost.css,NewPost.tsx), post(Post.css,Post.tsx), profile(Profile.css, Profile.tsx) |
- socket.io(SocketDispatcher.tsx,SocketDispatcherContext.tsx) |
- pages: home(Home.css, Home.tsx), products(Products.css, Products.tsx) |
- productArea: add-product(AddProduct.css,AddProduct.tsx),edit-product(EditProduct.css,AddProdEditProduct.tsx), product-card(ProductCard.css,ProductCard.tsx) |
shared: search-bar(SearchBar.css,SearchBar.tsx), sort-bar(SortBar.css,SortBar.tsx), loader(Loader.css,Loader.tsx) |

3) hooks -> UseService.ts, UseTitle.ts, UseUserID.ts, UseUserName.ts

4) models -> Login.ts, PostCommentDraft.ts,  PostComment.ts,  PostDraft.ts,  Post.ts,  User.ts, ProductModel.ts, ReviewModel.ts 

5) redux -> FeedSlice.ts, FollowersSlice.ts,  FollowingSlice.ts,  Hooks.ts,  ProfileSlice.ts,  Store.ts, ProductSlice.ts 

6) services -> 
auth-aware: AuthAware.ts, CommentService.ts,  FeedService.ts  FollowersService.ts,  FollowingService.ts,  ProfileService.ts, ProductService.ts  
auth.ts

7) utils -> AppConfig.ts,  UseTitle.ts, 

8) index.css, main,tsx

*Root*:
9) .env.development 

10) .env.production

**Meaning**: 
1) **React**: A JavaScript library and a mediator between the browser and the developer. Usually we develop from the end to the beginning - first the service, then creating components, navigations and applications (e.g. changing states). 
2) **Components**: Functions. Can be a part of a bigger component. It is aware of the information presented inside it, and also responsible for it. There cannot be a change in the page without doing it through a certain component. Every component has a state: when it changes, the component rerenders to reflect that change. The father component acknowledges the child component, but not vice-versa.  There is no way to change a component's state outside of itself. That is why we do not export it but making an interface out of it. useEffect function executes whenever the function(=component) renders and is used whenever outside data is necessary to fetch or DOM needs to be manipulated. If there is [] and it's not the first rendering, it wouldn't execute. If the component gets down from the display - it doesn't exist in React anymore. 
3) **Server**: - A program that runs, principally doesn't do a thing, waits for approaches, and responds to every call that's accepted. Will always run on a certain computer. To talk to a server we need to know that computer's address. URL structure: protocol://address:port/path.
4) **Hooks**: functions that starts with 'use' and interfaces with the React framwork itself. Can be created and/or read only inside another hook or component. We would like to create hooks whenever we need an access to a component's state.
5) **Redux** - A JavaScript library and an inner tool of React, doesn't receive the info from the server. Contains a store with all the slices (its reducers). You need not transmit changes in the states to the father & sons components anymore, but everything goes throughout the Redux within the dispatch function AppDispatcher. The components who subscribe the Redux - using the useAppSelector function render accordingly. The chain of changes: interface -> component -> server -> Redux store (fueled by slices) -> subscribed components. 
6) **Context** - share a state of a component. In an applicative data - that concerns a key and not a user - we do not use Redux but context. Within .ts files (not .tsx). We get access to the context with the useContext(context) function, in the condition it is below the component in the component-tree, not above it.
7) **Authentication** - once the server sends the user's info object (in the address auth/login), it codes it with jwt - JSON Web Token, returns it to the client, and achieves two goals: the client can always identify with this jwt, can send it backwards to the server, and from this point the server can always deduct who is the user that made contact with it. We storage and retrieve the jwt by the localStorage function: by that, when we refresh the page it keeps the jwt and doesn't reset the jwt. We get the jwt by the useContext function.    
8) **Web Sockets**: the server sends a message to the client and updates (though, the first update comes from the client). io(url) function connects to the socket and keeps the line of messaging open.
9) **Models**: Molded interfaces to be exported and implemented in components and other shenanigans.
10) **Services**: class/es that handles all website-related API calls and Redux state updates.
11) **Utils**: class/es that configure the application including base URL.
12) **index.css & main.tsx**: the actual and base application tree of Markup Language and CSS
13) **.env.development & .env.production**:  The actual url websites to run the application in developers' mode and production mode respectively.

# Step #1: Configuration

**Form**: 

**.env.development**:

```tsx
VITE_API_URL='https://dummyjson.com/'
```

**utils -> AppConfig.ts**:

```ts
class AppConfig {
	private readonly baseUrl = import.meta.env.VITE_API_URL;
	
	// Normal API calls (fast)
	public readonly productsUrl = this.baseUrl + "products";
	
	// Testing API calls with delay (slow) 
	// public readonly productsUrl = this.baseUrl + "products?delay=2000"; // 2 second delay for testing loader
}

export const appConfig = new AppConfig();
```

**Meaning**: In the env file we implement our base URL, and in the utils folder we create AppConfig exported singleton class that every service we will create will embrace. 


# Step #2: Model Skeletons - Review Model 

**Form**

**models -> ReviewModel.ts**

```ts
export default interface ReviewModel {
    rating: number;
    comment: string;
    date: string; // type Date? 
    reviewerName: string;
    reviewerEmail: string;
}
```
# Step #3: Model Skeletons - Product Model 

**Form**

**models -> ProductModel.ts**

```ts
import type ReviewModel from "./ReviewModel";

// TYPESCRIPT INTERFACE: Defines the structure/shape of a Product object
// WHY: Type safety - ensures all product objects have the required properties with correct types
// BENEFITS: IntelliSense autocomplete, compile-time error checking, better code documentation
export default interface ProductModel {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    reviews: ReviewModel[];
    images: string[];
}
```

**Meaning**: Models are interfaces, which are not instantiated. Assist Postman in order to reveal the elements you want to implement in the application from the interface. 

# Step #4: Navigation Bar 

**Form**: 

**components -> layout -> nav-bar -> NavBar.tsx**

```tsx
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  
  return (
    <div className='Navbar'>
      <h2 className='logo'>
        <NavLink to="/">
          ShopEase
        </NavLink>
      </h2>
      
      <div className='nav-links'>
        <NavLink to="/home"
        >
          Home
        </NavLink>
        <NavLink to="/products"
        >
          Products
        </NavLink>
      </div>
    </div>
  )
}
```

**Meaning**: 
- The Navigation Bar is a main application in the website.
- It has different NavLinks (thanks to the nav division) to extra piece of URLs.
- With the help of the Navlinks we can press the sections throughout which we want to link our website to(see Routes ahead of manual; they actually sketch the web regarding the link at present).


# Step #5: Search Bar - component implenetation of the Products Page  

**Form**: 

**components -> shared -> search-bar -> SearchBar.tsx**

```tsx
import './SearchBar.css'

// Props interface for SearchBar component, will be custom-used for each father component 
interface SearchBarProps {
    onSearch(searchTerm: string): void    // Callback function called when user types
    placeholder?: string                  // Optional placeholder text for input
}

// Reusable search bar component for filtering/searching products
export default function SearchBar(props: SearchBarProps) {

    const {onSearch,placeholder} = props

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value) 
    } //This whole function reason for existence is to do something in case of stroking a character in the input bar. It is a mediator function between the prop and the father function; based on the value, a father function will occur.

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    onChange={handleInputChange}  // Trigger search on every keystroke
                />
            </div>
        </div>
    )
}


```
**Meaning**: Implementation of a skeletal search bar in the Products Page (a main component which will actually respond to this skeleton and father it) igniting with every change of stroke.


# Step #6: Sort Bar - component implenetation of the Products Page  
**Form**: 
**components -> shared -> sort-bar -> SortBar.tsx**

```tsx
import './SortBar.css'

// Props interface for SortBar component
interface SortBarProps {
    onSort(sortBy: string, order: string): void  // Callback function for when sort option is selected
}

// Reusable sort bar component for sorting products by different criteria
export default function SortBar(props: SortBarProps) {

    const {onSort} = props
    // Handle sort option selection
    function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // Split the selected value (e.g., "price-asc") into sortBy and order
        const [sortBy, order] = event.target.value.split('-')
        // Call parent's callback with the sort parameters
        onSort(sortBy, order)
    }

    return (
        <div className="SortBar">
            <select 
                className="sort-select" 
                onChange={handleSortChange}
                defaultValue=""  // Default to placeholder option
            >
                {/* Placeholder option that cannot be selected */}
                <option value="" disabled>Sort by...</option>
                
                {/* Category sorting options */}
                <option value="category-asc">Category (A-Z)</option>
                <option value="category-desc">Category (Z-A)</option>
                
                {/* Price sorting options */}
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                
                {/* Rating sorting options */}
                <option value="rating-desc">Rating (Highest First)</option>
                <option value="rating-asc">Rating (Lowest First)</option>
            </select>
        </div>
    )
}

```

**Meaning**: Sorting Bar skeleton component that will be used in father's (product page) component utilizing the prop, which is a function connected by a handler, wrapped by onChange in the select division. The options have values which is split into two parameters - the sortBy parameter (which will be a string of 'category', 'price', 'rating'), and a order parameter (a string of 'ascending' or 'descending'). 


# Step #7: Spinner Button Animation

**Form**:  

**components -> common -> spinner-button -> SpinnerButton.tsx**

```tsx
import './SpinnerButton.css'
import spinnerSource from '../../../assets/loading1.gif'

interface SpinnerButtonProps {
    buttonText: string
    loadingText: string
    isSubmitting: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
export default function SpinnerButton(props: SpinnerButtonProps) {

    const { buttonText, loadingText, isSubmitting, onClick } = props
    return (
        <div className='SpinnerButton'>
            {!isSubmitting && <button onClick={onClick}>{buttonText}</button>}
            {isSubmitting && <span>{loadingText}...<i><img src={spinnerSource} /></i></span>}
        </div>
    )
}

// interface FollowProps {
//     user: User
//     isFollowing?: boolean
//     unfollow?(id: string): void
// }
// export default function Follow(props: FollowProps) {

//     const { user: { id, name }, isFollowing, unfollow } = props

//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


//     async function unfollowMe() {
//         try {
//             setIsSubmitting(true)
//             if (unfollow) {
//                 await followingService.unfollow(id)
//                 unfollow(id)
//             }
//         } catch (e) {
//             alert(e)
//         } finally {
//             setIsSubmitting(false)
//         }
//     }

//     return (
//         <div className='Follow'>
//             <img src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" />
//             <div>{name}</div>
//             <div>
//                 {isFollowing && <SpinnerButton
//                     onClick={unfollowMe}
//                     buttonText='unfollow'
//                     loadingText='unfollowing'
//                     isSubmitting={isSubmitting}
//                 />}
//             </div>
//         </div>
//     )
// }
```

**Meaning**: Spinner Button animation for every loading uses. In the comment an application example of the Spinner Button component.


# Step #8: Enter Redux with slices 

**Form**:

**redux -> ProductSlice.ts**

```ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type ProductModel from "../models/ProductModel";

// Initialize entire Products once: 
export default function initProducts(_currentState: ProductModel[], action: PayloadAction<ProductModel[]>): ProductModel[] {
    return action.payload;
}

// Add Product to global state: 
export function addProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Update Product in global state: 
export function updateProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === action.payload.id); // Locate index.
    if (index === -1) return currentState; // Guard against product not found
    newState[index] = action.payload; // Update - replace old Product with given Product.
    return newState;
}

// Delete Product from global state: 
export function deleteProduct(currentState: ProductModel[], action: PayloadAction<number>): ProductModel[] {
    const newState = [...currentState]; // Duplicate current state.
    const index = newState.findIndex(p => p.id === action.payload); // Locate index.
    if (index === -1) return currentState; // Guard against product not found
    newState.splice(index, 1); // Delete given Product.
    return newState; // Return the new state.
}

export const productSlice = createSlice({
    name: "products",
    initialState: [] as ProductModel[],
    reducers: { initProducts, addProduct, updateProduct, deleteProduct }
});


export const productActions = productSlice.actions;
```

**Meaning**: All the activities of the components are embedded in the Redux slice.
Some general Redux terms:
- **Global State**: the app‑wide data, sometimes typed as **AppState**.
- **Store**: the Redux object that manages access to the state tree.
- **Action**: an object sent to Redux to request a change. It has:
  - **type**: a string describing the operation.
  - **payload**: the data needed for that operation.
- **Dispatch**: the function that sends an action to Redux.
- **Action Creator**: a function that produces an action object.
- **Current State**: the data currently stored in Redux.
- **New State**: the data after a reducer applies a change.
- **Reducer**: a pure function that updates state based on the action.
- **Slice**: a helper that bundles a reducer, its initial state, and autogenerated action creators for a specific feature of your global state.

Slices are the main bundling members of Redux library, which are compressed in the store. 
Here are the reducers who represent the CRUD application to be applied in our app.
Each reducer has by its parameter a currentState and action.payload (the content to be updated/manipulated in the state), each one with corresponding type of state and the function type returned (all three could be different, mainly depends on logic).
The PayloadAction can be of type of single model, array of models, number (if only index is required, as in the delete reducer).
The slice itself is exported to the store as a function with an object parameter containing the name, the initalState of each reducer (heed the special circumventing lingo - we need a value which is a type, so we use the alias), and the reducers themselves.
They are exported to the store. Also, exported individually their actions (the reducers, or changing-state-functions).

# Step #9: Redux Store 

**Form**:

**redux -> Store.ts**

```ts
import { configureStore } from "@reduxjs/toolkit";
import type ProductModel from "../models/ProductModel";
import { productSlice } from "./ProductSlice";

// AppState defines the shape of our entire application state
export type AppState = {
    products: ProductModel[]; // Global products array accessible by all components
};

// STORE CREATION: Combines all reducers into a single store
export const store = configureStore<AppState>({
    reducer: {
        products: productSlice.reducer // Links the products slice to the store
    }
});

```

**Meaning**: This is the store of Redux Library. Contains two exports: 
- The AppState type, containing all the slices names and their initial states.
- The store itself, with all its slices' reducers - the CRUD operations - to be updated and conveyed to and from the relevant components using AppSelect and AppDispatch correspondetly.

# Step #10: Product Service  

**Form**: 

**services -> ProductService.ts**

```ts
import axios from "axios";
import { appConfig } from "../utils/AppConfig";
import type ProductModel from "../models/ProductModel";
import { productActions } from "../redux/ProductSlice";
import { store } from "../redux/Store";


class ProductService {
    
    //CRUD Actions dispatched to the store

    public async getProducts(): Promise<ProductModel[]> {
        const response = await axios.get(appConfig.productsUrl);
        const products = response.data.products;

        const action = productActions.initProducts(products);
        store.dispatch(action);

        return products;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const response = await axios.post(`${appConfig.productsUrl}/add`, product);

        const action = productActions.addProduct(response.data);
        store.dispatch(action);

        return response.data;
    }

    public async editProduct(productId: number, product: ProductModel): Promise<ProductModel> {
        const response = await axios.put(`${appConfig.productsUrl}/${productId}`, product);

        const action = productActions.updateProduct(response.data);
        store.dispatch(action);

        return response.data;
    }

    public async deleteProduct(productId: number): Promise<ProductModel> {
        const response = await axios.delete(`${appConfig.productsUrl}/${productId}`);

        const action = productActions.deleteProduct(productId);
        store.dispatch(action);
        
        return response.data;
    }

    ///Skeletal services - editing, searching, and sorting products - are not intertwined with the store but elicit data from the URL
    public async getProductById(productId: number): Promise<ProductModel> {
        const response = await axios.get(`${appConfig.productsUrl}/${productId}`);
        return response.data;
    }

    public async searchProducts(searchTerm: string): Promise<ProductModel[]> {
        const response = await axios.get(`${appConfig.productsUrl}/search?q=${searchTerm}`);
        return response.data.products;
    }

    public async sortProducts(sortBy: string, order: string): Promise<ProductModel[]> {
        const response = await axios.get(`${appConfig.productsUrl}?sortBy=${sortBy}&order=${order}`);
        return response.data.products;
    }

}

export const productService = new ProductService();
```

**Meaning**:
The service manages and updates/elicits information from the server asynchronically and returning a servant-peculiar promise (check the Postman for it).
It handles all product-related API calls and Redux state updates throughout fetching the relevant promises from the server using axios functions, and communicating with the store by dispatching the CRUD actions, so the store can activate them with the help of its reducers (slices).
Important note: axios and dispatch are only featured in services to be much more efficient.
The service also includes advanced services concerning other skeletal elements in the product component which do not concern the the store but the server's API. 

Other benefits:
-Separates business logic from UI components - components don't need to know about API details
-Centralized API logic (easy to modify endpoints, add error handling, etc.)
-Automatic Redux state updates (no manual dispatch needed in components)  
-Reusable across components (multiple components can use the same methods)
-Easier testing (mock the service instead of individual API calls)


# Step #11: Recurrent Component: Product Card 

**Form**:

**components -> product-area -> product-card -> ProductCard.tsx**
```ts
import type ProductModel from '../../../models/ProductModel'
import { productService } from '../../../services/ProductService'
import './ProductCard.css'

interface ProductCardProps {
    productCard: ProductModel
    isDelete?: boolean
    onDelete?(deletedProduct: ProductModel): void
}

const StarRating = ({ rating }: { rating: number }) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="star star-full">★</span>)
    }

    if (hasHalfStar) {
        stars.push(<span key="half" className="star star-half">☆</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} className="star star-empty">☆</span>)
    }

    return <div className="star-rating">{stars}</div>
}

export default function ProductCard(props: ProductCardProps) {
    const { productCard, isDelete, onDelete } = props

    const handleDelete = async () => {
        try {
            // REDUX INTEGRATION: ProductService.deleteProduct() automatically updates the Redux store
            // WHY: No need to manually update component state - Redux handles global state management
            // FLOW: 1) Call service → 2) Service updates Redux store → 3) All components get updated automatically
            const deletedProduct = await productService.deleteProduct(productCard.id)
            
            // CALLBACK: Still beacon parent component for immediate UI feedback (filtering, etc.)
            // WHY: Parent may need to update local filtered lists before Redux state propagates
            // NOTE: DummyJSON API returns the full deleted product. For APIs that return only { success: true },
            // you would pass the original product instead: onDelete?.(deletedProduct)
            onDelete?.(deletedProduct); 
            console.log('Product deleted:', deletedProduct);

        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    return (
        <article className="product-card">
            <div className="product-image-container">
                <img
                    src={productCard.images[0]}
                    alt={productCard.title}
                    className="product-image"
                    loading="lazy"
                />
                <div className="product-category-badge">
                    {productCard.category}
                </div>
            </div>

            <div className="product-content">
                <div className="product-header">
                    <h3 className="product-title">{productCard.title}</h3>
                    <div className="product-rating">
                        <StarRating rating={productCard.rating} />
                        <span className="rating-value">({productCard.rating})</span>
                    </div>
                </div>

                <p className="product-description">{productCard.description}</p>

                <div className="product-footer">
                    <div className="product-price-container">
                        <span className="product-price">${productCard.price.toFixed(2)}</span>
                        <span className="product-stock">
                            {productCard.stock > 0 ? `${productCard.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>

                    <button className="view-details-button" disabled={productCard.stock === 0} >
                        View Details
                    </button>

                    {isDelete && (
                        <button className="delete-button" onClick={handleDelete} >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

```

**Meaning**:
First of all, in the recurrent component there is an interface with props, including a model/s,boolean/s,& function/s.
There is a special feature of star array construction with special parameter lingo which will be implemented only in the function itself.
The function itself has the aforementioned props, button (in this case delete) handler, and the actual card return containing its relatively elaborate construction.
The manufacturing of the cards will be activated in the main components which would want to utilize it - both the home and products pages.


# Step #12: Hooks - UseTitles 
**Form**:

**hooks -> UseTitle.ts**

```ts
import { useEffect } from "react";

// Custom hook to dynamically set the browser tab title
// Usage: useTitle("Products") - changes browser tab to show "Products"
export default function useTitle(title: string): void {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

```

**Meaning**: Hooks are functions that interact with the React library and concern with the state of components. This hook dynamically changes the title of the web depending of each component is being drawn at the moment.


# Step #13: Component utilizations - Edit Product 
**Form**: 

**components -> product-area -> edit-product -> EditProduct.tsx**

```tsx
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import './EditProduct.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../redux/Store';

export default function EditProduct() {
    
    const { register, handleSubmit, reset, setValue } = useForm<ProductModel>();
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Get products from Redux store using standard useSelector
    const products = useSelector((state: AppState) => state.products);

    useEffect(() => {
        if (id) {
            loadProduct(+id);
        }
    }, [id, products]); // products dependency to reload when Redux state changes

    async function loadProduct(productId: number) {
        try {
            // OPTIMIZATION: First check if product exists in Redux store
            const existingProduct = products.find(p => p.id === productId);
            
            let product: ProductModel;
            
            if (existingProduct) {
                // REDUX ADVANTAGE: Use cached data from global store
                console.log('Loading product from Redux store (cached)');
                product = existingProduct;
            } else {
                // FALLBACK: Load from API if not in store (e.g., direct URL access)
                console.log('Loading product from API (direct access)');
                product = await productService.getProductById(productId);
            }
            
            // FORM POPULATION: Set form values regardless of data source
            setValue('title', product.title);
            setValue('description', product.description);
            setValue('category', product.category);
            setValue('price', product.price);
            setValue('rating', product.rating);
            setValue('stock', product.stock);
        } catch (error) {
            console.error('Error loading product:', error);
        }
    }

    async function onSubmit(data: ProductModel) {
        try {
            console.log('Updating:', data);
            
            if (id) {
                // REDUX INTEGRATION: ProductService.editProduct() automatically updates the Redux store
                const updatedProduct = await productService.editProduct(+id, data);
                console.log('Updated:', updatedProduct);
            }
            
            reset();
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <div className='EditProduct'>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='edit-product-form'>
                <input type="text" placeholder='Product Title' {...register('title', { required: true })}/>
                <input type="text" placeholder='Product Description' {...register('description', { required: true })}/>
                <input type="text" placeholder='Category' {...register('category', { required: true })}/>
                <input type="number" step="0.01" placeholder='Price' {...register('price', { required: true, valueAsNumber: true })}/>
                <input type="number" step="0.1" min="0" max="5" placeholder='Rating' {...register('rating', { required: true, valueAsNumber: true })}/>
                <input type="number" placeholder='Stock' {...register('stock', { required: true, valueAsNumber: true })}/>
                <div className="form-buttons">
                    <button type="button" onClick={() => navigate('/products')} className='back-btn'>Back</button>
                    <button type="submit" className='edit-product-btn'>Update Product</button>
                </div>
            </form>
        </div>
    )
}
```

**Meaning**:
- In this main component utiliziation, we import hook of form, hook of navigation, hook of effect, model, service, and store selector.
- The form has 4 relevant functions: register (the essential registrar of inputs to the React hook form and the collector of data in the inputs for the form to manage and validate), handleSubmit (the mediating function of the form submission by clicking and the hook form), reset (resetting the form) and setValue (an automated value setter of registered input).
- The hook useNavigate is used when clicked to navigate to the previous (main) page when clicked on the 'Back' button.
- The hook useParams is able to elicit the id from the url address (if exists). 
- useSelector function is here to get the prodcuts from the Redux store.
- useEffect to rerender page whenever there's a change in id or prodcuts, if there is activates the loadProduct function.
- loadProduct function tries to elicit product from the store by id, if not eliciting it from the server by the service, then a collection of setValue follows concerning the useForm hook to automatically fill the inputs.
- onSubmit function which binds and delivers the form content to handleSubmit hook form function to activate when the button is pressed, resets the form and navigates back to the products page.
- The utilization returns the main structure with the form, buttons with type submit (the Update button) or onClick to navigate back to the products page, inputs and registers inside them to collect, validate and manage the values in the inputs correspondingly.    


# Step #14: Component utilizations - Add Product 

**Form**: 

**components -> product-area -> add-product -> AddProduct.tsx**

```tsx
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './AddProduct.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import useTitle from '../../../utils/UseTitle';

export default function AddProduct() {
    const { register, handleSubmit, reset } = useForm<ProductModel>();
    const navigate = useNavigate();
    
    useTitle('Add Product');

    async function onSubmit(data: ProductModel) {
        try {
            console.log('Submitting:', data);
            
            // REDUX INTEGRATION: ProductService.addProduct() automatically updates the Redux store
            // WHY: No manual state management needed - service handles both API call and store update
            // FLOW: 1) Submit form → 2) Service adds to API → 3) Service dispatches addProduct action → 4) Redux store updated
            // BENEFIT: When user navigates back to /products, the new product will already be in the global state
            const newProduct = await productService.addProduct(data);
            console.log('Response:', newProduct);
            
            reset();
            navigate('/products');
        } catch (err) {
            console.error('Error adding product:', err);
            error((err as Error).message || 'Failed to add product');
        }
    }

    return (
        <div className='AddProduct'>
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='add-product-form'>
                <input type="text" placeholder='Product Title' {...register('title', { required: true })}/>
                <input type="text" placeholder='Product Description' {...register('description', { required: true })}/>
                <input type="text" placeholder='Category' {...register('category', { required: true })}/>
                <input type="number" step="0.01" placeholder='Price' {...register('price', { required: true, valueAsNumber: true })}/>
                <input type="number" step="0.1" min="0" max="5" placeholder='Rating' {...register('rating', { required: true, valueAsNumber: true })}/>
                <input type="number" placeholder='Stock' {...register('stock', { required: true, valueAsNumber: true })}/>
                <div className="form-buttons">
                    <button type="button" onClick={() => navigate('/products')} className='back-btn'>Back</button>
                    <button type="submit" className='add-product-btn'>Add Product</button>
                </div>
            </form>
        </div>
    )
}
```

**Meaning**:
This is a very similar format of the EditProduct component, and follows almost the same logic. The main differences here are that there are no setValue automated values, there is no need to subscribe to the store to fetch data, and the axios triggers another ProductSlice function.


# Step #15: Main Component - Products page 

**Form**: 

**components -> pages -> products -> Products.tsx**

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type ProductModel from '../../../models/ProductModel';
import './Products.css'
import { productService } from '../../../services/ProductService';
import ProductCard from '../../productArea/ProductCard/ProductCard';
import SearchBar from '../../shared/SearchBar/SearchBar';
import SortBar from '../../shared/SortBar/SortBar';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../redux/Store';
import Loader from '../../shared/loader/Loader';
import useTitle from '../../../utils/UseTitle';

export default function Products() {

    useTitle('Products');
    
    const [loading, setLoading] = useState(false);

    // Local state management - each component manages its own products state
    // const [products, setProducts] = useState<ProductModel[]>([]);

    // WHY: All components can now access the same product data without prop drilling.  When ProductService updates the store, all components automatically get the updates
    const products = useSelector((state: AppState) => state.products); // get products from global store using standard useSelector

    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]); //Filtering logic stays local since it's only used in this component

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                // No need to setProducts() anymore - ProductService updates Redux store directly
                // const fetchedProducts = await productService.getProducts(); 
                // setProducts(fetchedProducts);
                // Just call the service - it will update the Redux store automatically. ProductService.getProducts() already dispatches initProducts action to store
                await productService.getProducts();
                // BENEFIT: Other components can now access products without additional API calls
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []); 

    // Update filtered products when Redux products change. When the global products state changes, we need to update our local filter
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);


    // SERVICE-BASED SEARCH, SORTING & DELETING: Offload filtering and sorting to the service layer
    async function handleSearchService(searchTerm: string) {
    
        try {
            const searchResults = await productService.searchProducts(searchTerm);
            setFilteredProducts(searchResults);
        } catch (error) {
            console.error('Search failed:', error);
            setFilteredProducts([]);
        }
    }


    async function handleSortService(sortBy: string, order: string) {
        try {
            const sortedResults = await productService.sortProducts(sortBy, order);
            setFilteredProducts(sortedResults);
        } catch (error) {
            console.error('Sort failed:', error);
        }
    }

    async function handleDelete(deletedProductID: number) {
        try {
            const resultsMinusDeletedProduct = await productService.deleteProduct(deletedProductID);
            setFilteredProducts(prevFiltered => prevFiltered.filter(product => product.id !== resultsMinusDeletedProduct.id));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    }

    // LOCAL SEARCH, SORTING & DELETING: Keeping this code commented out for reference

    // function handleSearch(searchTerm: string) {
    //     const filtered = products.filter(product =>
    //         product.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredProducts(filtered);
    // }



    // function handleSort(sortBy: string, order: string) {
    //     const sorted = [...filteredProducts].sort((a, b) => {
    //         let aValue, bValue;

    //         switch (sortBy) {
    //             case 'category':
    //                 aValue = a.category.toLowerCase();
    //                 bValue = b.category.toLowerCase();
    //                 break;
    //             case 'price':
    //                 aValue = a.price;
    //                 bValue = b.price;
    //                 break;
    //             case 'rating':
    //                 aValue = a.rating;
    //                 bValue = b.rating;
    //                 break;
    //             default:
    //                 return 0;
    //         }

    //         if (order === 'asc') {
    //             return aValue > bValue ? 1 : -1; // If aValue > bValue, return 1 (put a after b) Otherwise return -1 (put a before b) -> Result: smaller values first → A-Z, 1-10, low-high
    //         } else {
    //             return aValue < bValue ? 1 : -1; // If aValue < bValue, return 1 (put a after b) Otherwise return -1 (put a before b) -> Result: larger values first → Z-A, 10-1, high-low
    //         }
    //     });

    //     setFilteredProducts(sorted);
    // }


    // function handleDelete(deletedProduct: ProductModel) {
    //     setFilteredProducts(prevFiltered => prevFiltered.filter(product => product.id !== deletedProduct.id));
    // }


    return (
        <div className='Products'>
            <h1 className='products-title'>All Products</h1>

            <div className="products-filter-container">
                <div className="products-filter-left">
                    <SearchBar onSearch={handleSearchService} />
                    <SortBar onSort={handleSortService} />
                </div>
                <Link to='/products/add' className='add-product-link'>+</Link>
            </div>

            {loading && <Loader />}

            <div className="products-container">
                {filteredProducts && filteredProducts.map(product => (
                    <ProductCard key={product.id} productCard={product} isDelete={true} onDelete={handleDelete} />
                ))}
            </div>

        </div>
    )
}

```

**Meaning**:

- The main component essentially is one of the pair of main pages: this time the products page. Consequentially, many imports are necessary, from react hooks, models, services, recurring components, skeletal components, redux subscribers and store dispatchers, to minor hooks.
- useState are exercised if local only to this component.
- The main useState function is setFilteredProducts, which updates the array of products with every rendering or change due to various functions in the component. useState always has to be interconnected with useEffect function to render the page with the new data within each state change.
- The secondary useState function is of the loading animation, to know when and if it should be drawn (based on conditional rendering in the return structure)
- There is an initial useEffect to render the page with initial products by asynchronically getting the products by the service. It should be noted that each service must promise the precise type of data to the correct function that calls it. In our case to each rendering the promise of the service must be an array of product models.
- Also, another useEffect is here not just for initialization of page but also for every change in the products.
- Then three handle services are here to try and catch asynchronically calls from the service (which probes the server) for each particular end. No need to mention, they wait for product models to update the state of products. If they do not wait for product models array but a single product model, then another action will happen to set product models in the end.
- In comment for reference - local handlers that do not involve calling the server (and therefore do not dispatch material to the Redux store).
- The order of things: interface -> component handler (who tries to call the service asynchronically) -> service (who updates/elicits from the server and dispatches to the store asynchronically ) -> store -> local useEffects in subscribed components that change whenever the AppState (mediated by useSelector subscription) or useState's state function are changed.
- The first attempt of calling the server in the handler is enveloped with a try & catch mechanism to catch errors if there are (e.g. the server has fallen temporarily). Why are they not in the services as well? Because the main components are the first link of the chain; if they will catch an error then we are all good (there need not be checks in later links of the chain).
- Finally in the return section is the actual structure of the products page component with all its applications, integrations, function handling and conditional rendering.  


# Step #16: Main Component - Home page 

**Form**: 

**components -> pages -> home -> Home.tsx**

```tsx
import { useEffect, useState } from 'react';
import './Home.css'
import type ProductModel from '../../../models/ProductModel';
import { productService } from '../../../services/ProductService';
import ProductCard from '../../productArea/ProductCard/ProductCard';

export default function Home() {
    const [randomProduct, setRandomProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRandomProduct();
    }, [])

    async function fetchRandomProduct() {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedProducts = await productService.getProducts();
            if (fetchedProducts.length > 0) {
                const randomIndex = Math.floor(Math.random() * fetchedProducts.length);
                const randomProduct = fetchedProducts[randomIndex];
                setRandomProduct(randomProduct);
            } else {
                setError('No products available');
            }
        } catch (err) {
            setError('Failed to load products');
            console.error('Error fetching products:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="home">
            <div className="content">
                <div className="left">
                    <h1 className="title">Welcome to our store</h1>
                    <p className="subtitle">Discover amazing products</p>
                    <div className="buttons">
                        <button className="shop-btn">Shop Now</button>
                        <button 
                            className="refresh-btn"
                            onClick={fetchRandomProduct}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'New Product'}
                        </button>
                    </div>
                </div>
                
                <div className="right">
                    {error ? (
                        <div className="error">
                            <p>{error}</p>
                            <button onClick={fetchRandomProduct}>Try Again</button>
                        </div>
                    ) : isLoading ? (
                        <div className="loading">Loading...</div>
                    ) : randomProduct ? (
                        <ProductCard productCard={randomProduct} />
                    ) : null}
                </div>
            </div>
        </main>
    )
}
```

**Meaning**:

- The homepage is one of the two main component, and likewise is similar to the products page but with less functionality.
- Contains imports of certain models and services, including the fundamental functions of React: useEffect and useState.
- Three useState functions are applied: for randomal product which is shown, loading state applied on the button and on the product card, and error message if nothing is shown.
- fetchRandomProduct function is straightforward, setting the above mentioned states, fetching products with the service, and using math functions for randomizing.
- The structure contains a button with functionality (show newly randomized product and conditional rendering of its writing), and a nice chained ternary for the randomized card; if the checks are allowed, the product card will finally be shown. 


# Step #17: Routing 

**Form**: 

**components -> layout -> routing -> Routing.tsx**

```tsx
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import Products from "../../pages/products/Products";
import AddProduct from "../../productArea/AddProduct/AddProduct";
import EditProduct from "../../productArea/EditProduct/EditProduct";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
    )
}
```

**Meaning**:

- Routes has a routing function: embedding a Route in Routes envelope. Each Route has a path(extra piece of URLs) and elements(where I should navigate to or which component I will sketch in the main division in regard to the path chosen).
- Main Difference between Navigation and Routing: Routing sketches the component based on the URL path we are currently in, navigation simply changes (=linking) the URL path (e.g. by clicking a button). 


# Step #18: Layout 

**Form**: 

**components -> layout -> layout -> Layout.tsx**

```tsx
import Navbar from '../navbar/Navbar'
import Routing from '../routing/Routing'
import './Layout.css'


export default function Layout() {
  return (
    <div className='Layout'>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routing />
      </main>
    </div>
  )
}
```

**Meaning**:

- The layout is the core envelope of our application, wherein we have Navigation Bar in the nav division and Routing section in the main division (or any other logical arrangement).


# Step #19: Main 

**Form**: 

**main.tsx**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/layout/layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/Store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
            {/* This makes the Redux store available to all components via useSelector/useDispatch */}
            <Provider store={store}>
                <Layout />
            </Provider>
        </BrowserRouter>
  </StrictMode>,
)
```

**Meaning**: Finally the main tsx file in the root src file. This is the actual HTML drawing and the only place in which getElementById exists. This is the place where all the commands, connections, functions, layout, router and store slouce their information. It does that by enveloping with hierarchy the Mark-Up tree. The layout is embedded in the store, which in turn is hugged by the BrowserRouter (to know we are dealing with computer apps and not mobole apps). Finally StrictMode wraps the enchilada up to make rules strict and without glitches.

-----------------------------------------------------------------------------------------


# Step X# : Advanced Structure: Authentication, jwt, hooks, context, and sockets

## S1
```ts
export default interface Login {
    username: string,
    password: string
}
```

## S2
```ts
import { createContext } from "react"

interface AuthContextInterface {
    jwt: string,
    newJwt(jwt: string): void
}

const AuthContext = createContext<AuthContextInterface | null>(null)
export default AuthContext

```

## S3
```tsx
import { useState, type PropsWithChildren } from "react";
import AuthContext from "./AuthContext";

export default function Auth(props: PropsWithChildren) {

    const [jwt, setJwt] = useState<string>(localStorage.getItem('jwt') || '')

    const { children } = props

    function newJwt(jwt: string) {
        setJwt(jwt)
        localStorage.setItem('jwt', jwt)
    }

    return (
        <AuthContext.Provider value={{ jwt, newJwt }}>
            {children}
        </AuthContext.Provider>
    )
}
```


## S4
```ts
import type { AxiosInstance } from "axios";
import axios from "axios";

export default abstract class AuthAware {
    axiosInstance: AxiosInstance

    constructor(jwt: string, clientId: string) {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_REST_SERVER_URL,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'x-client-id': `${clientId}`
            }
        })
    }
}
```

## S5
```ts
import axios from "axios"
import type Login from "../models/login"

class AuthService {
    async login(login: Login): Promise<{ jwt: string }> {
        const { data } = await axios.post<{ jwt: string }>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`, login)
        return data
    }
}

const authService = new AuthService()
export default authService
```

## S6
```tsx
import { useContext, useState } from 'react'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import './Login.css'
import { useForm } from 'react-hook-form'
import type LoginModel from '../../../models/login'
import authService from '../../../services/auth'
import AuthContext from '../auth/AuthContext'

export default function Login() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { register, handleSubmit } = useForm<LoginModel>()

    const authContext = useContext(AuthContext)

    async function submit(login: LoginModel) {
        try {
            setIsSubmitting(true)
            const { jwt } = await authService.login(login)
            authContext?.newJwt(jwt)
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(submit)}>

                <input placeholder='username' {...register('username')} />
                <input placeholder='password' type="password" {...register('password')} />
                <SpinnerButton
                    buttonText='Login'
                    loadingText='logging in'
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    )
}
```


## S7
```tsx
import { createContext } from "react"

interface SocketDispatcherContextInterface {
    clientId: string
}

const SocketDispatcherContext = createContext<SocketDispatcherContextInterface | null>(null)
export default SocketDispatcherContext
```

## S8
```ts
import { useContext, useMemo } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import { jwtDecode } from "jwt-decode"

export default function useUserId() {
    const authContext = useContext(AuthContext)

    const id = useMemo(() => {
        if (authContext?.jwt) {
            const { id } = jwtDecode<{ id: string }>(authContext.jwt)
            return id
        }
    }, [authContext])

    return id

}
```

## S9
```ts
import { useContext, useMemo } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import { jwtDecode } from "jwt-decode"

export default function useUsername() {
    const authContext = useContext(AuthContext)

    const name = useMemo(() => {
        const { name } = jwtDecode<{ name: string }>(authContext!.jwt)
        return name
    }, [authContext])

    return name

}
```

## S10
```ts
import { useEffect } from "react"

export default function useTitle(title: string) {
    useEffect(() => {
        document.title = title
    }, [title])
}
```

## S11
```ts
import { useContext } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import type AuthAware from "../services/auth-aware/AuthAware"
import SocketDispatcherContext from "../components/socket.io/SocketDispatcherContext"

export default function useService<T extends AuthAware>(Service: { new(jwt: string, clientId: string): T }): T {
    const authContext = useContext(AuthContext)
    const socketDispatcherContext = useContext(SocketDispatcherContext)

    const service = new Service(authContext!.jwt, socketDispatcherContext!.clientId)

    return service
}
```

## S12
```tsx
import { useEffect, useState, type PropsWithChildren } from "react";
import { io } from "socket.io-client";
import type Post from "../../models/post";
import type User from "../../models/user";
import { useAppDispatcher } from "../../redux/hooks";
import { newPost } from "../../redux/profile-slice";
import useUserId from "../../hooks/use-user-id";
import { newFollower } from "../../redux/followers-slice";
import { follow } from "../../redux/following-slice";
import { v4 } from "uuid";
import SocketDispatcherContext from "./SocketDispatcherContext";

export default function SocketDispatcher(props: PropsWithChildren) {

    const dispatch = useAppDispatcher()
    const userId = useUserId()

    const [clientId] = useState<string>(v4())
    

    useEffect(() => {
        const socket = io(`${import.meta.env.VITE_IO_SERVER_URL}`)
        socket.onAny((eventName: string, payload) => {
            if (payload.from === clientId) return;
            switch (eventName) {
                case 'new-post':
                    if ((payload.post as Post).user.id === userId) {
                        dispatch(newPost(payload.post as Post))
                    }
                    break;
                case 'new-follow':
                    if (userId === (payload.followee as User).id) {
                        dispatch(newFollower((payload.follower as User)))
                    } else if (userId === (payload.follower as User).id) {
                        dispatch(follow(payload.followee as User))
                    }
                    break;
            }
        })

        return () => { socket.disconnect() }
    }, [dispatch, userId])



    const { children } = props

    return (
        <SocketDispatcherContext.Provider value={{ clientId }}>
            {children}
        </SocketDispatcherContext.Provider>
    )
}
```

## S13
```ts
import type User from "../../models/user"
import AuthAware from "./AuthAware"

export default class FollowersService extends AuthAware {
    async getFollowers(): Promise<User[]> {
        const { data } = await this.axiosInstance<User[]>(`/follows/followers`)
        return data
    }
}

```
## S14
```ts
import AuthAware from "./AuthAware"
import type User from "../../models/user"

export default class FollowingService extends AuthAware {
    async getFollowing(): Promise<User[]> {
        const { data } = await this.axiosInstance<User[]>(`/follows/following`)
        return data
    }

    async unfollow(userId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/follows/unfollow/${userId}`)
        return data
    }

    async follow(userId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/follows/follow/${userId}`)
        return data
    }

}

```
## S15
```ts
import type Post from "../../models/post"
import AuthAware from "./AuthAware"
import type PostDraft from "../../models/post-draft"

export default class ProfileService extends AuthAware {

    async getProfile(): Promise<Post[]> {
        const response = await this.axiosInstance.get<Post[]>(`/profile`)
        return response.data
    }

    async remove(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete(`/profile/${id}`)
        return response.data
    }

    async newPost(draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.post<Post>(`/profile`, draft)
        return response.data
    }

    async getPost(id: string): Promise<Post> {
        const response = await this.axiosInstance<Post>(`/profile/${id}`)
        return response.data
    }

    async editPost(id: string, draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.patch<Post>(`/profile/${id}`, draft)
        return response.data
    }
}
```
## S16
```ts
import type Post from "../../models/post"
import AuthAware from "./AuthAware"

export default class FeedService extends AuthAware {
    async getFeed(): Promise<Post[]> {
        const { data } = await this.axiosInstance<Post[]>(`/feed`)
        return data
    }


}

```
## S17
```ts
import type PostCommentDraft from "../../models/post-comment-draft"
import type PostComment from "../../models/post-comment"
import AuthAware from "./AuthAware"

export default class CommentsService extends AuthAware {
    async newComment(postId: string, draft: PostCommentDraft): Promise<PostComment> {
        const { data } = await this.axiosInstance.post<PostComment>(`/comments/${postId}`, draft)
        return data
    }
}

```


## S18
```tsx
import { useForm } from 'react-hook-form'
import type PostCommentDraft from '../../../../models/post-comment-draft'
import './NewComment.css'
import { useState } from 'react'
import SpinnerButton from '../../../common/spinner-button/SpinnerButton'
import { useAppDispatcher } from '../../../../redux/hooks'
import { newComment } from '../../../../redux/profile-slice'
import useService from '../../../../hooks/use-service'
import CommentsService from '../../../../services/auth-aware/CommentsService'

interface NewCommentProps {
    postId: string
}
export default function NewComment(props: NewCommentProps) {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { postId } = props

    const { register, handleSubmit, reset, formState } = useForm<PostCommentDraft>()

    const dispatch = useAppDispatcher()

    const commentsService = useService(CommentsService)

    async function submit(draft: PostCommentDraft) {
        try {
            setIsSubmitting(true)
            const comment = await commentsService.newComment(postId, draft)
            reset()
            dispatch(newComment(comment))
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <div className='NewComment'>
            <form onSubmit={handleSubmit(submit)}>
                <textarea {...register('body', {
                    required: {
                        value: true,
                        message: 'Body is required'
                    },
                    minLength: {
                        value: 20,
                        message: 'short comments are not for us'
                    }
                })}></textarea>
                <div className="formError">{formState.errors.body?.message}</div>

                <SpinnerButton
                    buttonText='add comment'
                    loadingText='adding comment'
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    )
}
```

## S19
```tsx
import { useNavigate, useParams } from 'react-router-dom'
import './EditPost.css'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type PostDraft from '../../../models/post-draft'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/profile-slice'
import useService from '../../../hooks/use-service'
import ProfileService from '../../../services/auth-aware/ProfileService'

export default function EditPost() {

    const profileService = useService(ProfileService)

    const { id } = useParams<'id'>()

    const { register, handleSubmit, reset, formState } = useForm<PostDraft>()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isReady, setIsReady] = useState<boolean>(false)

    const post = useAppSelector(state => state.profileSlice.posts.find(p => p.id === id))
    const dispatch = useAppDispatcher()

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            // const post = await profileService.getPost(id!)
            if (!post) {
                const profileFromServer = await profileService.getProfile()
                dispatch(init(profileFromServer))
            } else {
                const { title, body } = post
                const draft = { title, body }
                reset(draft)
                setIsReady(true)
            }
        })()

    }, [dispatch, id, post, reset])

    async function submit(draft: PostDraft) {
        try {
            setIsSubmitting(true)
            await profileService.editPost(id!, draft)
            navigate('/profile')
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='EditPost'>

            {!isReady && <Spinner />}

            {isReady && <>
                <form onSubmit={handleSubmit(submit)}>
                    <input placeholder="add title" {...register('title', {
                        required: {
                            value: true,
                            message: 'Title is required'
                        },
                        minLength: {
                            value: 10,
                            message: 'Title must be at least 10 characters long'
                        }
                    })} />
                    <div className='formError'>{formState.errors.title?.message}</div>
                    <textarea placeholder='add content' {...register('body', {
                        required: {
                            value: true,
                            message: 'Post content is required'
                        },
                        minLength: {
                            value: 20,
                            message: 'Post content must be at least 20 characters long'
                        }
                    })}></textarea>
                    <div className='formError'>{formState.errors.body?.message}</div>
                    <SpinnerButton
                        buttonText='Update Post'
                        loadingText='updating post'
                        isSubmitting={isSubmitting}
                    />
                    <input></input>
                </form>
            </>}

        </div>
    )
}
```

## S20
```tsx
import { BrowserRouter } from 'react-router-dom'
import Layout from '../layout/layout/Layout'
import './App.css'
import store from '../../redux/store'
import { Provider as Redux } from 'react-redux'
import Auth from '../auth/auth/Auth'
import SocketDispatcher from '../socket.io/SocketDispatcher'

function App() {

    return (
        <BrowserRouter>
            <Auth>
                <Redux store={store}>
                    <SocketDispatcher>
                        <Layout />
                    </SocketDispatcher>
                </Redux>
            </Auth>
        </BrowserRouter>
    )
}

export default App
```

## 21

```tsx
import { useContext } from 'react'
import Followers from '../../follows/followers/Followers'
import Following from '../../follows/following/Following'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Main from '../main/Main'
import './Layout.css'
import Login from '../../auth/login/Login'
import AuthContext from '../../auth/auth/AuthContext'

export default function Layout() {

    const authContext = useContext(AuthContext)

    const isLoggedIn = !!authContext?.jwt

    return (
        <div className='Layout'>

            {isLoggedIn && <>
                <header>
                    <Header />
                </header>
                <aside>
                    <Following />
                </aside>
                <aside>
                    <Followers />
                </aside>
                <main>
                    <Main />
                </main>
            </>}

            {!isLoggedIn && <Login />}
            <footer>
                <Footer />
            </footer>
        </div>
    )
}
```

## 21 default.json
```json
{
    "app": {
        "port": 3000,
        "name": "weezer dev",
        "secret": "MySecret",
        "jwtSecret": "JwtSecret"
    },
    "db": {
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "",
        "database": "weezer"
    },
    "s3": {
        "bucket": "images.weezer.com",
        "connection": {
            "endpoint": "http://localhost:4566",
            "region": "us-east-1",
            "credentials": {
                "accessKeyId": "test",
                "secretAccessKey": "test"
            },
            "forcePathStyle": true
        }
    }
}
```

## 23 app.ts

```ts
import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import authRouter from './routers/auth'
import profileRouter from './routers/profile'
import feedRouter from './routers/feed'
import followsRouter from './routers/follows'
import commentsRouter from './routers/comments'
import config from 'config'
import sequelize from './db/sequelize';
import enforceAuth from './middlewares/enforce-auth';
import cors from 'cors'
import { createAppBucketIfNotExists, testUpload } from './aws/aws';
import fileUpload from 'express-fileupload';

const app = express()


const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)

app.use(cors())

// post decypher middlewares
app.use(json())
app.use(fileUpload())

// load routers
app.use('/auth', authRouter)
app.use(enforceAuth)
app.use('/profile', profileRouter)
app.use('/feed', feedRouter)
app.use('/follows', followsRouter)
app.use('/comments', commentsRouter)

// not found
app.use(notFound)

// error middlewares
app.use(logger)
app.use(responder)

// synchronize database schema (not data) changes to the database
// i.e syncs our TypeScript models folder into the actual SQL Schema
// sequelize.sync({ force: true })
sequelize.sync({ force: process.argv[2] === 'sync' })

createAppBucketIfNotExists()
// testUpload()

console.log(process.argv)

app.listen(port, () => console.log(`${appName} started on port ${port}`))
```

## 24 file-uploader.ts
```ts
import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import s3Client from "../aws/aws";
import config from 'config'
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import { extname } from "path";

declare global {
    namespace Express {
        interface Request {
            imageUrl: string
        }
    }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
    if (!req.files) next()
    if (!req.files.image) next()

    console.log(req.files)    

    const { mimetype , data, name} = req.files.image as UploadedFile

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: config.get<string>('s3.bucket'),
            Key: `${randomUUID()}${extname(name)}`,
            ContentType: mimetype,
            Body: data
        }
    })

    const result = await upload.done()
    req.imageUrl = result.Location
    next()
}
```

## 25 aws.ts
```ts
import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import config from 'config'

const s3Connection = JSON.parse(JSON.stringify(config.get<object>('s3.connection')))

const s3Client = new S3Client(s3Connection)

export async function createAppBucketIfNotExists() {
    try {
        const result = await s3Client.send(
            new CreateBucketCommand({
                Bucket: config.get<string>('s3.bucket')
            })
        )
        console.log(result)
    } catch (e) {
        console.log('bucket creation failed. silenting exception, bucket probably already exists', e)        
    }
}

export async function testUpload() {
    try {
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: config.get<string>('s3.bucket'),
                Key: 'test.txt',
                ContentType: 'text/plain',
                Body: 'hello world, localstack seems to work'
            }
        })

        const result = await upload.done()
        console.log('upload result:', result)
    } catch (e) {
        console.log('exception in test upload: ', e)
    }
}

export default s3Client
```

## 26 profile.ts
```ts
import { Router } from "express";
import { createPost, deletePost, getPost, getProfile, updatePost } from "../controllers/profile/controller";
import validation from "../middlewares/validation";
import { getPostValidator, newPostImageValidator, newPostValidator, updatePostValidator } from "../controllers/profile/validator";
import paramValidation from "../middlewares/param-validation";
import enforceAuth from "../middlewares/enforce-auth";
import fileUploader from "../middlewares/file-uploader";
import fileValidation from "../middlewares/file-validation";

const router = Router()
// DELETE /profile/1
router.get('/', getProfile)
router.get('/:id', paramValidation(getPostValidator), getPost)
router.delete('/:id', deletePost)
router.post('/', validation(newPostValidator), fileValidation(newPostImageValidator) , fileUploader, createPost)
router.patch('/:id', validation(updatePostValidator), updatePost)


export default router
```

## 27 profile validator
```ts
import Joi from "joi";

export const newPostValidator = Joi.object({
    title: Joi.string().min(10).max(40).uppercase().required(),
    body: Joi.string().min(20).required()
})

export const newPostImageValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png')
    }).unknown(true).optional()
})

export const updatePostValidator = newPostValidator

export const getPostValidator = Joi.object({
    id: Joi.string().uuid()
})
```

## 28 fileValidation.ts
```ts
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function fileValidation(validator: ObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            req.files = await validator.validateAsync(req.files)
            next()
        } catch (e) {
            next({
                status: 422,
                message: e.message
            })
        }
    }

}
```

## 28
```ts

```

```tsx
import { NextFunction, Request, Response } from "express";
import Post from "../../models/Post";
import User from "../../models/User";
import Comment from "../../models/Comment";
import { newPostValidator } from "./validator";
import postIncludes from "../common/post-includes";

export async function getProfile(req: Request, res: Response, next: NextFunction) {

    try {
        // const profile = await Post.findAll({ where: { userId } })
        const { posts } = await User.findByPk(req.userId, {
            include: [{
                model: Post,
                ...postIncludes
            }]
        })
        res.json(posts)
    } catch (e) {
        next(e)
    }
}

export async function getPost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const post = await Post.findByPk(req.params.id, postIncludes)
        res.json(post)
    } catch (e) {
        next(e)
    }
}

export async function deletePost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const deletedRows = await Post.destroy({ where: { id } })
        if (deletedRows === 0) return next({
            status: 404,
            message: 'yo bro, da racord u wana dalete as not yar'
        })
        res.json({ success: true })
    } catch (e) {
        next(e)
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {

    try {
        const newPost = await Post.create({ 
            ...req.body, 
            userId: req.userId, 
            imageUrl: req.imageUrl 
        })
        await newPost.reload(postIncludes)
        res.json(newPost)
    } catch (e) {
        next(e)
    }
}

export async function updatePost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const post = await Post.findByPk(req.params.id, postIncludes);
        const { title, body } = req.body
        post.title = title
        post.body = body
        await post.save()
        res.json(post)
    } catch (e) {
        next(e)
    }
}
```

```ts
export default interface PostDraft {
    title: string,
    body: string,
    image?: File
// eslint-disable-next-line semi
};
```


```tsx
import { useForm } from 'react-hook-form';
import type PostDraft from '../../../models/post-draft';
import './NewPost.css';
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import { useState } from 'react';
import { useAppDispatcher } from '../../../redux/hooks';
import { newPost } from '../../../redux/profile-slice';
import useService from '../../../hooks/use-service';
import ProfileService from '../../../services/auth-aware/ProfileService';

export default function NewPost() {

    const { register, handleSubmit, reset, formState } = useForm<PostDraft>();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const dispatch = useAppDispatcher();

    const profileService = useService(ProfileService);

    async function submit(draft: PostDraft) {
        draft.image = (draft.image as unknown as FileList)[0];
        try {
            setIsSubmitting(true);
            const post = await profileService.newPost(draft);
            reset();
            dispatch(newPost(post));
        } catch (e) {
            alert(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='NewPost'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder="add title" {...register('title', {
                    required: {
                        value: true,
                        message: 'Title is required'
                    },
                    minLength: {
                        value: 10,
                        message: 'Title must be at least 10 characters long'
                    }
                })} />
                <div className='formError'>{formState.errors.title?.message}</div>
                <textarea placeholder='add content' {...register('body', {
                    required: {
                        value: true,
                        message: 'Post content is required'
                    },
                    minLength: {
                        value: 20,
                        message: 'Post content must be at least 20 characters long'
                    }
                })}></textarea>
                <div className='formError'>{formState.errors.body?.message}</div>
                <input type='file' {...register('image')}/>
                <SpinnerButton
                    buttonText='Add Post'
                    loadingText='adding post'
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
}
```


```ts
import type Post from "../../models/post";
import AuthAware from "./AuthAware";
import type PostDraft from "../../models/post-draft";

export default class ProfileService extends AuthAware {

    async getProfile(): Promise<Post[]> {
        const response = await this.axiosInstance.get<Post[]>(`/profile`);
        return response.data;
    }

    async remove(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete(`/profile/${id}`);
        return response.data;
    }

    async newPost(draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.post<Post>(`/profile`, draft, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    async getPost(id: string): Promise<Post> {
        const response = await this.axiosInstance<Post>(`/profile/${id}`);
        return response.data;
    }

    async editPost(id: string, draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.patch<Post>(`/profile/${id}`, draft);
        return response.data;
    }
}
```

```ts
import { BelongsToMany, Column, HasMany } from "sequelize-typescript";
import { Default } from "sequelize-typescript";
import { Index } from "sequelize-typescript";
import { AllowNull } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";
import { PrimaryKey } from "sequelize-typescript";
import { Model, Table } from "sequelize-typescript";
import Comment from "./Comment";
import Post from "./Post";
import Follow from "./Follow";

@Table({
    underscored: true
})
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(30))
    name: string

    @AllowNull(false)
    @Index({ unique: true })
    @Column(DataType.STRING)
    username: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string

    @HasMany(() => Post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    posts: Post[]

    @HasMany(() => Comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    comments: Comment[]

    @BelongsToMany(() => User, () => Follow, 'followeeId', 'followerId')
    followers: User[]

    @BelongsToMany(() => User, () => Follow, 'followerId', 'followeeId')
    following: User[]
}
```


```yaml
version: '3.8'

# services - here i am going to list containers that i want to build
# each service, actually describes a docker run command
services:
  # docker run --name weezer-db -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=weezer -e MYSQL_TCP_PORT=3306 -p 3308:3306 shaharsol/weezer-db:1.0.0
  database:
    container_name: weezer-db-compose
    environment:
      - MYSQL_ALLOW_EMPTY_PASSWORD=1
      - MYSQL_DATABASE=weezer
      - MYSQL_TCP_PORT=3306
    ports:
      - "3309:3306"
    #image: shaharsol/weezer-db:1.0.0
    build: ./database
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1"]
      interval: 1m30s
      timeout: 30s
      retries: 5
      start_period: 30s
  
  # docker run --name weezer-backend -d -e NODE_ENV=docker  -p 3010:3000 shaharsol/weezer-backend:3.0.0
  backend:
    container_name: weezer-backend-compose
    environment:
      - NODE_ENV=compose
    ports:
      - "3020:3000"
    build: ./backend
    depends_on:
      database:
        condition: service_healthy
        
# docker run --name weezer-frontend -d -p 3011:5173 shaharsol/weezer-frontend:1.0.1
  frontend:
    container_name: weezer-frontend-compose
    ports: 
      - 3012:80
    build:
      context: ./frontend
      dockerfile: Dockerfile.compose

  localstack:
    container_name: weezer-localstack
    ports:
      - 4566:4566
      - 4510-4599:4510-4599
    image: localstack/localstack
```
