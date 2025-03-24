import {useEffect, useState} from 'react';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';

export function Tables() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const { data, error } = await supabase
    .from('categories')
    .select("*")

    if (error){
      console.log("Error fetching categories: ",error);
    }else{
      setCategories(data);
    }
  } 

  useEffect(() => {
    fetchCategories() //dont do this jsjs
  }, []);

  return (
    <div className="flex flex-col h-full bg-purple-100 p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Navega por el contenido de la app
      </h1>
      <p className="text-gray-800 mb-8">
        Selecciona una categoría:
      </p>
      <div className="flex gap-10 max-w-full w-full h-full">
        {categories.map((category) => (
          <div 
          key={category.category_id} 
          className="bg-white w-1/3 p-4 rounded-lg shadow justify-items-center content-center"
          onClick={() => navigate(`/tables_modules/${category.category_id}`)}
        >
            {/*img src={category.image} alt={category.title} className="w-full h-auto" />*/}
            <p className="text-gray-400 mt-10 text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
