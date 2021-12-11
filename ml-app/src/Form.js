import { useState } from 'react';
import './Form.css';

function Form() {
   const [form, setForm] = useState({
      age: "",
      sex: "",
      bmi: "",
      children: "",
      smoker: "",
      age_range: "",
      have_children: "",
   });
   //'age', 'sex', 'bmi', 'children', 'smoker', 'age_range','have_children'
   const [loading, setLoading] = useState(false);
   const [result, setResult] = useState("");

   const handleSubmit = (event) => {
      event.preventDefault();

      const form_data = new FormData();
      form_data.append("1", form.age);
      form_data.append("2", form.sex);
      form_data.append("3", form.bmi);
      form_data.append("4", form.children);
      form_data.append("5", form.smoker);

      setLoading(true);

      fetch('https://backend-charges-prediction.herokuapp.com/predict', {
         method: 'POST',
         body: form_data
      })
         .then(response => response.text())
         .then(html => {
            setResult(html);
            setLoading(false);
         })
   };

   const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [name]: value });
   };

   const handleClear = () => {
      setForm({
         age: "",
         sex: "",
         bmi: "",
         children: "",
         smoker: "",
      });

      setResult("");
   };

   return (
      <form onSubmit={handleSubmit}>
         <h4>Medical Cost Calculator</h4>
         <input type="number" name="age" value={form.age} onChange={onChange} placeholder="Age" required />
         <input type="number" name="sex" onChange={onChange} value={form.sex} placeholder="Sex (Male: 0/Female: 1)" required />
         <input type="number" name="bmi" onChange={onChange} value={form.bmi} placeholder="BMI" required />
         <input type="number" name="children" onChange={onChange} value={form.children} placeholder="Number of Children" required />
         <input type="number" name="smoker" onChange={onChange} value={form.smoker} placeholder="Smoker" required />
         {result && <span onClick={handleClear}>Clear Prediction</span>}

         <button type="submit" disabled={loading}>{loading ? "Predicting Result..." : "Submit Form"}</button>
         {result && <div dangerouslySetInnerHTML={{ __html: 'Predicted Cost: '+result }} className="result" />}
      </form>
   );
}

export default Form;