"use client";
import { Component, useState } from "react";


export default function AddRecipe({ onClose }: { onClose: () => void }) {    
    const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    cookingTime: 1,
    difficulty: "EASY",
    spicyLevel: "MILD",
    imageUrl: "",
    calories: 0,
    mealType: "OTHER",

    });
    const filedStyle = {

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
       
        const { name, value } = e.target;
        setFormData((prev => ({ ...prev, [name]: value })));
    } 
        const [status, setStatus] = useState({ loading: false, error: "", success: ""});
        async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus({ loading: true, error: "", success: ""})
    try {
        const payload = {
            title: formData.title,
            instructions: formData.instructions,
            cookingTime: Number(formData.cookingTime),
            difficulty: formData.difficulty,
            spicyLevel: formData.spicyLevel,
            imageUrl: formData.imageUrl,
            calories: Number(formData.calories), 
            mealType: formData.mealType,
        };
        console.log("Skickar payload:", JSON.stringify(payload));
        const res = await fetch("http://localhost:8080/recipe/new", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });
        if (!res.ok){
            const errorBody = await res.text();
            console.error("Backend svarar:", errorBody);
            throw new Error(" Could not create recipe");
    }
        setStatus({ loading: false, error: "", success: "Recipe created successfully!" });
    } catch (err) {
        setStatus({ loading: false, error: "Failed to create recipe", success: ""})
    }
    }
    

    
        
    
    return(
       <main style={{ padding: 24}}>
        <button
        onClick={onClose}
        style={{
        float: "right",
        padding: "5px 10px",
        border: "1px solid #ff9900",
        borderRadius: 8
        }}
>
        X
        </button>
                  
           <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <h1 style ={{ border: "2px solid #ffa600",
             borderRadius: 12,
              fontSize: 20,
               fontWeight: 100,
                padding: "10px 100px",
                marginLeft: "600px",
                marginRight: "200px",
                textAlign: "center"
                
             }}>New Recipe</h1> 
              </div>
       
            
            <div style={{ 
                border: "2px solid #ffa600",
                borderRadius: 12,
                padding: "10px",
                margin: "20px 0px"
                }}>
                </div>
            
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12,  }}>
                    <label style ={{ fontSize: 18, fontWeight: 100, }}>Recipe Title:</label>
                   
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter recipe title" style={{ 
                        padding: "10px",
                         border: "1px solid #ff9900",
                          borderRadius: 10,
                           width: "100%",
                           marginBottom: "10px"
                            }} />
                </div>
                <div>
                    <label style ={{ fontSize: 18, fontWeight: 100, }}>Instructions:</label>
                    <textarea rows={6} name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Enter recipe instructions"  style={{ 
                        padding: "10px",
                         border: "1px solid #ff9900",
                          borderRadius: 10,
                           width: "100%",
                           marginTop: "10px",
                           textAlign: "left"
                    
                            }} />
                </div>
                <div>
                <label style ={{ fontSize: 18, fontWeight: 100, marginBottom: 10 }}>Cooking Time (minutes):</label>
                    <input type="number" name="cookingTime" min={1} step={1}value={formData.cookingTime} onChange={handleChange} placeholder="Enter cooking time" style={{ 
                        padding: "10px",
                        border: "1px solid #ff9900",
                        borderRadius: 10,
                        marginTop: 10,
                        width: "100%",  

                        }} />
               
                </div>
                <div style ={{ marginTop: 10 }}>   
                <label style ={{ fontSize: 18, fontWeight: 100,
                 }}>Difficulty:</label>

                        
                </div>
             <select name="difficulty" value={formData.difficulty} onChange={handleChange}
              style={{ 
                        padding: "10px",
                        border: "1px solid #ff9900",
                        marginTop:10,
                        borderRadius: 10,
                        backgroundColor: "#070707",
                         }}>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>
                <div style ={{ marginTop: 10 }}>
                <label style ={{ fontSize: 18, fontWeight: 100,        
                 }}>Spicy Level:</label>
                </div>
                
               <div>
                <select name= "spicyLevel" value={formData.spicyLevel} onChange={handleChange} style={{ 
                        padding: "10px",
                        border: "1px solid #ff9900",
                        borderRadius:10,
                        marginTop: 10,
                        backgroundColor: "#070707",}}>
                            <option value="MILD">Mild</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HOT">Hot</option>
                        </select>
                </div>
                 <div style ={{
                        marginTop: 10,
                        }}>
                    <label style ={{fontSize: 18, fontWeight: 100,}}>Meal Type:</label>
                 </div>
                <div>
                    <select name= "mealType" value={formData.mealType} onChange={handleChange} style={{
                        padding: "10px",
                        border: "1px solid #ff9900",
                        borderRadius:10,
                        marginTop: 10,
                        backgroundColor: "#070707",
                    }}>
                            <option value= "BREAKFAST">Breakfast</option>
                            <option value= "LUNCH">Lunch</option>
                            <option value= "DINNER">Dinner</option>
                            <option value= "OTHER">Other</option>
                        </select>
                </div>
                
                <div style={{ marginTop: 10,}}>
                <label style ={{ fontSize: 18, fontWeight: 100,}}>
                Image URL:
                </label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Enter picture URL  (optional)" 
                style={{ 
                        padding: "10px",
                         border: "1px solid #ff9900",
                          borderRadius: 10,
                           width: "100%",
                           marginTop: "10px"
                            }} />
                        
                
                </div>
                <div style={{ marginTop: 10,}}>
                <label style={{ fontSize: 18, fontWeight: 100,}}>
                kcal/100g:
                </label>
                <input type="text" name="calories" value={formData.calories} onChange={handleChange} placeholder="Enter calories (optional)" 
                style={{ 
                        padding: "10px",
                         border: "1px solid #ff9900",
                          borderRadius: 10,
                           width: "100%",
                           marginTop: "10px"
                            }} />
                </div>   
               <div style={{marginTop: 10,}}>
                    <button type="submit" disabled={status.loading}
                        style={{
                            padding: "10px",
                            border: "1px solid #ff9900",
                            marginTop: 10,
                            borderRadius: 10,
                            

                        }}
                        >Save Recipe</button>
                        
                </div> 
                </form>
            
            {status.error && <p>{status.error}</p>}
            {status.success && <p>{status.success}</p>}
             
             </main>
                
);
}