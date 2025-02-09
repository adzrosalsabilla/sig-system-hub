import{q as x,W as j,j as a,Y as p,b as c}from"./app-C3BOZ1X1.js";import{D as u}from"./DashboardLayout-GOxXuqDZ.js";import{B as i}from"./button-CPshFZPR.js";import{C as g,a as f,b,c as D,d as N}from"./card-DMTEW9kf.js";import{P as k}from"./PaginationSection-B5eYMnIL.js";import{C as T,P as C,A as y,a as A,b as w,c as I,d as H,e as B,f as M,g as P,h as S}from"./alert-dialog-B-q36wKQ.js";import{T as Y,a as v,b as n,c as l,d as z,e as r}from"./table-CWWwCZMh.js";import{d as F}from"./dayjs.min-DtvMHBXf.js";import{T as R}from"./trash-2-CyFkJAVG.js";import"./sheet-DIB6rJWg.js";import"./index-CtqNtBL0.js";import"./pagination-Cj4AAWFN.js";function X(){var d,t;const{inventories:s}=x().props,{delete:o}=j({search:""}),m=e=>{o(route("admin.inventory.delete",e.toString()))};return a.jsxs(u,{title:"Inventaris",children:[a.jsx(p,{title:"Inventaris"}),a.jsx("main",{className:"grid  flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8",children:a.jsxs(g,{"x-chunk":"dashboard-06-chunk-0",children:[a.jsx(f,{children:a.jsxs("div",{className:"flex items-center justify-between",children:[a.jsx(b,{children:"Daftar Barang Inventaris"}),a.jsx(c,{href:route("admin.inventory.create"),children:a.jsxs(i,{size:"sm",className:"h-7 gap-1",children:[a.jsx(T,{className:"h-3.5 w-3.5"}),a.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:"Tambah Item"})]})})]})}),a.jsx(D,{children:a.jsxs(Y,{children:[a.jsx(v,{children:a.jsxs(n,{children:[a.jsx(l,{children:"#"}),a.jsx(l,{children:"Kode Barang"}),a.jsx(l,{children:"Nama"}),a.jsx(l,{children:"Stok"}),a.jsx(l,{children:"Harga"}),a.jsx(l,{className:"hidden md:table-cell",children:"Tanggal Dibeli"}),a.jsx(l,{children:a.jsx("span",{className:"sr-only",children:"Actions"})})]})}),a.jsxs(z,{children:[((d=s==null?void 0:s.data)==null?void 0:d.length)===0&&a.jsx(n,{children:a.jsx(r,{colSpan:5,align:"center",children:"Tidak ada data"})}),(t=s==null?void 0:s.data)==null?void 0:t.map((e,h)=>a.jsxs(n,{children:[a.jsx(r,{children:s.from+h}),a.jsx(r,{className:"font-medium",children:e.item_code}),a.jsx(r,{className:"font-medium",children:e.name}),a.jsx(r,{className:"font-medium",children:e.stock}),a.jsx(r,{children:Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(e.price)}),a.jsx(r,{className:"hidden md:table-cell",children:F(e.purchase_date).format("DD MMMM YYYY")}),a.jsx(r,{children:a.jsxs("div",{className:"space-x-2",children:[a.jsx(c,{href:route("admin.inventory.edit",e.id.toString()),children:a.jsxs(i,{variant:"outline",size:"sm",children:[a.jsx(C,{className:"h-4 w-4"}),a.jsx("span",{className:"sr-only",children:"Edit"})]})}),a.jsxs(y,{children:[a.jsx(A,{asChild:!0,children:a.jsxs(i,{variant:"outline",size:"sm",children:[a.jsx(R,{className:"h-4 w-4"}),a.jsxs("span",{className:"sr-only",children:["Hapus"," "]})]})}),a.jsxs(w,{children:[a.jsxs(I,{children:[a.jsx(H,{children:"Apakah kamu yakin?"}),a.jsx(B,{children:"Tindakan ini tidak dapat dibatalkan. Ini akan menghapus barang secara permanen dan menghapusnya dari server kami."})]}),a.jsxs(M,{children:[a.jsx(P,{children:"Batal"}),a.jsx(S,{onClick:()=>m(e.id),children:"Hapus"})]})]})]})]})})]},e.id))]})]})}),a.jsx(N,{children:a.jsxs("div",{className:"flex justify-between w-full items-center",children:[a.jsxs("div",{className:"text-xs text-muted-foreground flex-1",children:["Menampilkan"," ",a.jsxs("strong",{children:[s.from||0,"-",s.to||0]})," ","dari ",a.jsx("strong",{children:s.total})," produk"]}),a.jsx(k,{data:s})]})})]})})]})}export{X as default};
