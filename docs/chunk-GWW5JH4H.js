import{a as N,b as w,c as M,d as R,e as s,f as B,g as _,h as P,i as k,j as A,k as q,l as j,m as D,n as G,o as T,p as U,q as L,r as V,s as O,t as v,u as $,v as z}from"./chunk-PP4I67DY.js";import{g as y,h as x,k as E}from"./chunk-XQIPWIPS.js";import"./chunk-2J4O7ELU.js";import{Ib as m,Ta as c,Ua as h,_ as d,ia as f,ja as g,jb as I,lb as p,qb as r,rb as o,sb as l,vc as S,yb as b,yc as F}from"./chunk-OWWBDD46.js";var W=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=f({type:e,selectors:[["app-layour-page"]],decls:3,vars:0,consts:[[1,"grid","p-3"],[1,"col-12","mt-5","md:col-6","md:","col-offset-3","md:mt-8"]],template:function(n,a){n&1&&(r(0,"div",0)(1,"div",1),l(2,"router-outlet"),o()())},dependencies:[y]});let i=e;return i})();function K(i,e){i&1&&(r(0,"mat-form-field",3)(1,"mat-label"),m(2,"N\xFAmero de cuenta bancaria"),o(),l(3,"input",17),o())}function Q(i,e){i&1&&(r(0,"mat-form-field",3)(1,"mat-label"),m(2,"Confirmar cuenta bancaria"),o(),l(3,"input",18),o())}var Y=(()=>{let e=class e{constructor(t,n,a){this.authService=t,this.snackBar=n,this.router=a,this.showBankAccountInput=!1,this.usuariosInfo=[],this.registerForm=new R({usuario:new s("",{nonNullable:!0}),contrasena:new s("",{nonNullable:!0}),id:new s(""),email:new s("",{nonNullable:!0}),direccion:new s("",{nonNullable:!0}),esAgricultor:new s(!1,{nonNullable:!0}),cuentaBanco:new s("",{nonNullable:!1}),telefono:new s(0,{nonNullable:!0})}),this.selectedRole=!1}ngOnInit(){this.authService.getUsuarios().subscribe({next:t=>{this.usuariosInfo=t},error:t=>{console.error("Error al obtener productos:",t)}})}roleSelected(t){this.selectedRole=t,t===!0?this.showBankAccountInput=!0:this.showBankAccountInput=!1}get currentUsuario(){return this.registerForm.value}onSubmit(){if(this.registerForm.invalid)return;let t=this.registerForm.value;if(this.usuariosInfo.find(a=>a.usuario===t.usuario)){this.showSnackBar(`El nombre de usuario '${t.usuario}' ya est\xE1 en uso. Por favor, elige otro.`);return}t.id=this.generateUsuarioId(),this.authService.addUsuario(t).subscribe(a=>{this.showSnackBar(`${t.usuario} se a\xF1adi\xF3!`)}),this.router.navigate(["./auth/login"])}showSnackBar(t){this.snackBar.open(t,"Cerrar",{duration:3e3})}generateUsuarioId(){let t=[],n;this.usuariosInfo.forEach(u=>{u.id.startsWith("P")&&u.id.length===4&&t.push(u.id)}),console.log("IDs que empiezan por P y tienen 4 caracteres:",t);let a;if(t.length>0){let u=t[t.length-1];a=parseInt(u.substring(1),10)+1}else a=1;return n="P"+a.toString().padStart(3,"0"),n}};e.\u0275fac=function(n){return new(n||e)(h(q),h(V),h(x))},e.\u0275cmp=f({type:e,selectors:[["app-register-page"]],decls:46,vars:5,consts:[[1,"flex","flex-column"],[1,"text-lg","mb-4"],[3,"formGroup"],[1,"col-12"],["formControlName","usuario","type","text","matInput","","placeholder","Escriba su nombre de usuario","required","",1,"col-12"],["formControlName","email","type","email","matInput","","placeholder","Escriba su correo electr\xF3nico","required","",1,"col-12"],["formControlName","contrasena","type","password","matInput","","placeholder","Escriba la contrase\xF1a","required","",1,"col-12"],["type","password","matInput","","placeholder","Repita la contrase\xF1a","required","",1,"col-12"],["formControlName","telefono","type","text","matInput","","placeholder","Escriba su n\xFAmero de tel\xE9fono","required","",1,"col-12"],["formControlName","direccion","type","text","matInput","","placeholder","Escriba su direcci\xF3n","required","",1,"col-12"],["required","","formControlName","esAgricultor"],[1,"primary",3,"change","value"],[1,"text-lg","mb-4",2,"color","black"],["class","col-12",4,"ngIf"],["mat-button","","mat-flat-button","","color","accent",1,"col-12",3,"click"],[1,"flex","justify-content-end","mt-5"],["href","/auth/login"],["formControlName","cuentaBanco","type","text","matInput","","placeholder","Escriba su n\xFAmero de cuenta bancaria",1,"col-12"],["type","text","matInput","","placeholder","Reescriba su n\xFAmero de cuenta bancaria",1,"col-12"]],template:function(n,a){n&1&&(r(0,"div",0)(1,"span",1)(2,"h1"),m(3,"Registrarme"),o()(),r(4,"form",2)(5,"mat-form-field",3)(6,"mat-label"),m(7,"Usuario"),o(),l(8,"input",4),o(),r(9,"mat-form-field",3)(10,"mat-label"),m(11,"Correo electr\xF3nico"),o(),l(12,"input",5),o(),r(13,"mat-form-field",3)(14,"mat-label"),m(15,"Contrase\xF1a"),o(),l(16,"input",6),o(),r(17,"mat-form-field",3)(18,"mat-label"),m(19,"Confirmar contrase\xF1a"),o(),l(20,"input",7),o(),r(21,"mat-form-field",3)(22,"mat-label"),m(23,"N\xFAmero de tel\xE9fono"),o(),l(24,"input",8),o(),r(25,"mat-form-field",3)(26,"mat-label"),m(27,"Direcci\xF3n"),o(),l(28,"input",9),o(),r(29,"div",3)(30,"mat-radio-group",10)(31,"mat-radio-button",11),b("change",function(){return a.roleSelected(!0)}),r(32,"span",12),m(33,"Agricultor/Ganadero"),o()(),r(34,"mat-radio-button",11),b("change",function(){return a.roleSelected(!1)}),r(35,"span",12),m(36,"Consumidor/Cliente"),o()()()(),I(37,K,4,0,"mat-form-field",13)(38,Q,4,0,"mat-form-field",13),r(39,"button",14),b("click",function(){return a.onSubmit()}),r(40,"mat-icon"),m(41,"login"),o(),m(42," Registrarme "),o()(),r(43,"div",15)(44,"a",16),m(45," \xBFYa tienes cuenta?"),o()()()),n&2&&(c(4),p("formGroup",a.registerForm),c(27),p("value",!0),c(3),p("value",!1),c(3),p("ngIf",a.showBankAccountInput),c(),p("ngIf",a.showBankAccountInput))},dependencies:[S,j,G,D,T,U,O,v,B,N,w,M,k,_,P]});let i=e;return i})();var X=[{path:"",component:W,children:[{path:"login",component:L},{path:"register",component:Y},{path:"**",redirectTo:"login"}]}],H=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=g({type:e}),e.\u0275inj=d({imports:[E.forChild(X),E]});let i=e;return i})();var Be=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=g({type:e}),e.\u0275inj=d({imports:[F,H,$,v,A,z]});let i=e;return i})();export{Be as AuthModule};