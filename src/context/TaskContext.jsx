import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const loginWithMagicLink = async (email, navigate) => {
    setLoading(true);
    try {
      // 1. Intentar iniciar sesión o registrarse con el Magic Link
      const { error } = await supabase.auth.signInWithOtp({ email: email, shouldCreateUser: false, emailRedirectTo: "/"});
      if (error) {
        throw error;
      }

      // 2. Verificar si el usuario ya está autenticado
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw userError;
      }

      // 3. Si el usuario ya existe, redirigir al Home
      if (userData?.user) {
        navigate("/");
      } else {
        // 4. Si no, pedirle que revise su correo para completar el registro
        alert("Correo no registrado\nRevisa tu correo para registrarte.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error al cerrar sesión: ", error.message);
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  /*  const createTask = async (taskName) => {
      setAdding(true);
      try {
        const user = supabase.auth.getUser();
  
        const { error, data } = await supabase.from("tasks").insert({
          name: taskName,
          userId: user.id,
        });
  
        setTasks([...tasks, ...data]);
  
        if (error) {
          throw error;
        }
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setAdding(false);
      }
    };
  
    const getTasks = async (done = false) => {
      setLoading(true);
  
      const user = supabase.auth.getUser();
  
      try {
        const { error, data } = await supabase
          .from("tasks")
          .select("id, name, done")
          .eq("userId", user.id)
          .eq("done", done)
          .order("id", { ascending: false });
  
        if (error) {
          throw error;
        }
  
        setTasks(data);
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const updateTasks = async (id, updatedFields) => {
      try {
        const user = supabase.auth.getUser();
        const { error, data } = await supabase
          .from("tasks")
          .update(updatedFields)
          .eq("userId", user.id)
          .eq("id", id);
        if (error) {
          throw error;
        }
  
        setTasks(tasks.filter((task) => task.id !== data[0].id));
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };
  
    const deleteTask = async (id) => {
      try {
        const user = supabase.auth.user();
  
        const { error, data } = await supabase
          .from("tasks")
          .delete()
          .eq("userId", user.id)
          .eq("id", id);
  
        if (error) {
          throw error;
        }
  
        setTasks(tasks.filter((task) => task.id !== data[0].id));
      } catch (error) {
        alert(error.error_description || error.message);
      }
    };
    */

  return (
    <TaskContext.Provider
      value={{
        tasks,
        /*getTasks,
        createTask,
        updateTasks,
        deleteTask,*/
        loading,
        adding,
        loginWithMagicLink,
        logout,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};