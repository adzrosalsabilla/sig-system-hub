import{W as n,j as e,Y as d}from"./app-C3BOZ1X1.js";import{I as u}from"./InputError-CSLH8cYc.js";import{P as c}from"./PrimaryButton-zNe3VKvu.js";import{T as x}from"./TextInput-eAi8N49M.js";import{G as p}from"./GuestLayout-B-OgGfOC.js";function y({status:t}){const{data:a,setData:o,post:r,processing:m,errors:i}=n({email:""}),l=s=>{s.preventDefault(),r(route("password.email"))};return e.jsxs(p,{children:[e.jsx(d,{title:"Forgot Password"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),t&&e.jsx("div",{className:"mb-4 text-sm font-medium text-green-600",children:t}),e.jsxs("form",{onSubmit:l,children:[e.jsx(x,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",isFocused:!0,onChange:s=>o("email",s.target.value)}),e.jsx(u,{message:i.email,className:"mt-2"}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsx(c,{className:"ms-4",disabled:m,children:"Email Password Reset Link"})})]})]})}export{y as default};
