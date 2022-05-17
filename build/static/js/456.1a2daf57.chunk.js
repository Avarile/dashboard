"use strict";(self.webpackChunkdashboard=self.webpackChunkdashboard||[]).push([[456],{1456:function(e,t,n){n.r(t),n.d(t,{default:function(){return w}});var r=n(1413),i=n(9439),o=n(2791),c=(n(6072),n(7309)),a=n(5861),u=n(7757),d=n.n(u),l=n(570),s=n(7031),p=n(3734),m=n(8243),h=n(7541),x=n(4245),Z=n(531);var f=function(e,t){var n=o.useState(e),r=(0,i.Z)(n,2),c=r[0],a=r[1];return o.useEffect((function(){var n=setTimeout((function(){a(e)}),t);return function(){clearTimeout(n)}}),[e,t]),c},y=n(1966),b=n(184),v={labelCol:{span:4},wrapperCol:{span:20}},g=function(){var e=(0,y.Z)("dev"),t=(0,o.useRef)(),n=(0,o.useRef)({}),u=o.useState(!1),g=(0,i.Z)(u,2),j=g[0],k=g[1],I=(0,o.useState)([]),S=(0,i.Z)(I,2),P=S[0],w=S[1],C=(0,o.useState)({name:"",sku:""}),T=(0,i.Z)(C,2),F=T[0],D=(T[1],f(F,3e3),function(){var t=(0,a.Z)(d().mark((function t(){var n,r=arguments;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=r.length>0&&void 0!==r[0]?r[0]:{},t.next=3,h.Z.get("".concat(e.dbUri,"/products?").concat(x.stringify((0,Z.yE)(n))));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}());return(0,o.useEffect)((function(){D().then((function(e){w(e)}))}),[]),(0,b.jsxs)(l.Z,(0,r.Z)((0,r.Z)({initialValues:{}},v),{},{name:"nest-messages",onFinish:function(e){},style:{flex:1},ref:function(e){t.current=e},children:[(0,b.jsxs)(l.Z.Item,{label:"Product Name",style:{marginBottom:0},children:[(0,b.jsx)(l.Z.Item,{name:["product","productName"],rules:[{required:!0}],style:{display:"inline-block",width:"calc(50% - 8px)",paddingRight:"5px"},children:(0,b.jsx)(s.Z,{onChange:function(){var e,i=null===(e=t.current)||void 0===e?void 0:e.getFieldValue("product"),o={name:i.productName};D(o).then((function(e){var o,c=(null===e||void 0===e?void 0:e[0])||{},a=c.currentInStock,u=c.sku,d=c.updateLog;n.current=null===e||void 0===e?void 0:e[0],null===(o=t.current)||void 0===o||o.setFieldsValue({product:(0,r.Z)((0,r.Z)({},i),{},{productSku:u,productDescription:d,productQuantityAdd:0,productQuantityInstock:a})})}))}})}),(0,b.jsx)(l.Z.Item,{name:["product","productSku"],style:{display:"inline-block",width:"calc(50% - 8px)"},children:(0,b.jsx)(p.Z,{placeholder:"Select Product",onChange:function(){var e,i=null===(e=t.current)||void 0===e?void 0:e.getFieldValue("product"),o={sku:i.productSku};D(o).then((function(e){var o;n.current=null===e||void 0===e?void 0:e[0];var c=(null===e||void 0===e?void 0:e[0])||{},a=c.name,u=c.currentInStock,d=(c.sku,c.updateLog);null===(o=t.current)||void 0===o||o.setFieldsValue({product:(0,r.Z)((0,r.Z)({},i),{},{productName:a,productQuantityInstock:u,productDescription:d,productQuantityAdd:0})})})).catch((function(e){throw new Error(e)}))},children:P.map((function(e){return(0,b.jsx)(p.Z.Option,{value:e.sku,children:e.sku},e.id)}))})})]}),(0,b.jsx)(l.Z.Item,{name:["product","productSku"],label:"SKU",rules:[{required:!1,message:"must provide products SKU"}],children:(0,b.jsx)(s.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productQuantityAdd"],label:"Quantity Addition",rules:[{type:"number",min:0}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productQuantityInstock"],label:"Quantity inStock",rules:[{type:"number",min:0,max:99999}],children:(0,b.jsx)(m.Z,{disabled:!0})}),(0,b.jsx)(l.Z.Item,{name:["product","productDescription"],label:"Description",children:(0,b.jsx)(s.Z.TextArea,{style:{minHeight:"20rem",maxHeight:"25rem"}})}),(0,b.jsxs)(l.Z.Item,{wrapperCol:(0,r.Z)((0,r.Z)({},v.wrapperCol),{},{offset:8}),children:[(0,b.jsx)(c.Z,{loading:j,type:"primary",block:!0,style:{marginBottom:"1rem"},onClick:function(){k(!0),setTimeout((function(){var i,o,c,a,u,d=null===(i=t.current)||void 0===i?void 0:i.getFieldValue("product"),l=d.productQuantityAdd,s=d.productDescription,p=n.current,m=p.id,x=(0,r.Z)((0,r.Z)({},p),{},{currentInStock:p.currentInStock+l,updateLog:s});(c=m,a=x,u="Product",h.Z.put("".concat(e.dbUri,"/products/").concat(c),a,u)).then((function(e){e.id})),k(!1),null===(o=t.current)||void 0===o||o.resetFields()}),2e3)},children:"Submit"}),(0,b.jsx)(c.Z,{onClick:function(){var e;null===(e=t.current)||void 0===e||e.resetFields()},block:!0,children:"Reset Form"})]})]}))},j=n(5969),k={labelCol:{span:4},wrapperCol:{span:20}},I=function(){var e=(0,y.Z)("dev"),t=(0,o.useRef)(),n=o.useState(!1),a=(0,i.Z)(n,2),u=a[0],d=a[1];return(0,b.jsxs)(l.Z,(0,r.Z)((0,r.Z)({},k),{},{name:"product creation",onFinish:function(e){},style:{flex:1},ref:function(e){t.current=e},children:[(0,b.jsx)(l.Z.Item,{name:["product","productType"],label:"Product Type",rules:[{required:!0}],children:(0,b.jsx)(p.Z,{placeholder:"Please select a Type",onChange:function(){d(!1)},children:j.M5.map((function(e){return(0,b.jsx)(p.Z.Option,{value:e.name,children:e.name},e.id)}))})}),(0,b.jsx)(l.Z.Item,{name:["product","productSubType"],label:"SubType",rules:[{required:!0}],children:(0,b.jsx)(p.Z,{placeholder:"Please select SubType of the product",children:j.gg.map((function(e){return(0,b.jsx)(p.Z.Option,{value:e.name,children:e.name},e.id)}))})}),(0,b.jsx)(l.Z.Item,{name:["product","productDetail"],label:"Detail",rules:[{required:!0}],children:(0,b.jsx)(p.Z,{placeholder:"Please select the detail definition",children:j.Xv.map((function(e){return(0,b.jsx)(p.Z.Option,{value:e.name,children:e.name},e.id)}))})}),(0,b.jsx)(l.Z.Item,{name:["product","productName"],label:"Product Name",rules:[{required:!0}],children:(0,b.jsx)(s.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productSku"],label:"SKU",rules:[{required:!0}],children:(0,b.jsx)(s.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productSize"],label:"Size",rules:[{required:!0}],children:(0,b.jsx)(s.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productLength"],label:"Length",rules:[{required:!0}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productPrice"],label:"Price",rules:[{type:"number",min:0}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productPowderCoatingPrice"],label:"PowderCoatingPrice",rules:[{type:"number",min:0}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productPowderInstallationPrice"],label:"InstallationPrice",rules:[{type:"number",min:0}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productDescription"],label:"Description",children:(0,b.jsx)(s.Z.TextArea,{style:{minHeight:"10rem",maxHeight:"25rem"}})}),(0,b.jsx)(l.Z.Item,{name:["product","productSpecification"],label:"Specification",children:(0,b.jsx)(s.Z.TextArea,{style:{minHeight:"10rem",maxHeight:"25rem"}})}),(0,b.jsxs)(l.Z.Item,{wrapperCol:(0,r.Z)((0,r.Z)({},k.wrapperCol),{},{offset:8}),children:[(0,b.jsx)(c.Z,{type:"primary",block:!0,style:{marginBottom:"1rem"},loading:u,onClick:function(){d(!0),setTimeout((function(){var n,r,i,o=null===(n=t.current)||void 0===n?void 0:n.getFieldValue("product"),c={subtype:o.productSubType,detail:o.productDetail,length:o.productLength,type:o.productType,name:o.productName,sku:o.productSku,size:o.productSize,price:o.productPrice,powdercoatingPrice:o.productPowderCoatingPrice,installationPrice:o.productPowderInstallationPrice,desc:o.productDescription,spec:o.productSpecification,currentInStock:0,updateLog:"",lastUpdate:(0,Z.uO)()};i=c,h.Z.post("".concat(e.dbUri,"/products"),i,{},"Product"),d(!1),null===(r=t.current)||void 0===r||r.resetFields()}),2e3)},children:"Submit"}),(0,b.jsx)(c.Z,{onClick:function(){var e;null===(e=t.current)||void 0===e||e.resetFields()},block:!0,children:"Reset Form"})]})]}))},S={labelCol:{span:4},wrapperCol:{span:20}},P=function(){var e=(0,y.Z)("dev"),t=(0,o.useRef)(),n=(0,o.useState)(!1),u=(0,i.Z)(n,2),v=(u[0],u[1]),g=(0,o.useState)([]),k=(0,i.Z)(g,2),I=k[0],P=k[1],w=(0,o.useState)({name:"",sku:""}),C=(0,i.Z)(w,2),T=C[0],F=(C[1],f(T,3e3),function(){var t=(0,a.Z)(d().mark((function t(){var n,r=arguments;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=r.length>0&&void 0!==r[0]?r[0]:{},t.next=3,h.Z.get("".concat(e.dbUri,"/products?").concat(x.stringify((0,Z.yE)(n))));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()),D=function(){var t=(0,a.Z)(d().mark((function t(n,r){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h.Z.put("".concat(e.dbUri,"/products/").concat(n),r,"Product");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();return(0,o.useEffect)((function(){F().then((function(e){P(e)}))}),[]),(0,b.jsxs)(l.Z,(0,r.Z)((0,r.Z)({initialValues:{}},S),{},{name:"nest-messages",onFinish:function(e){},style:{flex:1},ref:function(e){t.current=e},children:[(0,b.jsxs)(l.Z.Item,{label:"Search for the Product",style:{marginBottom:0},children:[(0,b.jsx)(l.Z.Item,{name:["product","productName"],rules:[{required:!0}],style:{display:"inline-block",width:"calc(50% - 8px)",paddingRight:"5px"},children:(0,b.jsx)(s.Z,{placeholder:"Please Input the product name",onChange:function(){var e,n=null===(e=t.current)||void 0===e?void 0:e.getFieldValue("product"),i={name:n.productName};F(i).then((function(e){var i,o=(null===e||void 0===e?void 0:e[0])||{},c=o.type,a=o.size,u=o.price,d=o.powdercoatingprice,l=o.currentInStock,s=o.sku,p=o.updateLog,m=o.spec,h=o.desc,x=o.installationprice;null===(i=t.current)||void 0===i||i.setFieldsValue({product:(0,r.Z)((0,r.Z)({},n),{},{productType:c,productSku:s,productUpdateLog:p,productQuantityAdd:0,productQuantityInstock:l,productSpecification:m,productDescription:h,productInstallationPrice:x,productPowderCoatingPrice:d,productPrice:u,productSize:a})})}))}})}),(0,b.jsx)(l.Z.Item,{name:["product","productSku"],style:{display:"inline-block",width:"calc(50% - 8px)"},children:(0,b.jsx)(p.Z,{placeholder:"Select Product from list",onChange:function(){var e,n=null===(e=t.current)||void 0===e?void 0:e.getFieldValue("product"),i={sku:n.productSku};F(i).then((function(e){var i;console.log(e);var o=(null===e||void 0===e?void 0:e[0])||{},c=o.type,a=o.name,u=o.size,d=o.price,l=o.powdercoatingprice,s=o.currentInStock,p=o.updateLog,m=o.spec,h=o.desc,x=o.installationprice;null===(i=t.current)||void 0===i||i.setFieldsValue({product:(0,r.Z)((0,r.Z)({},n),{},{productType:c,productName:a,productUpdateLog:p,productQuantityAdd:0,productQuantityInstock:s,productSpecification:m,productDescription:h,productInstallationPrice:x,productPowderCoatingPrice:l,productPrice:d,productSize:u})})})).catch((function(e){throw new Error(e)}))},children:I.map((function(e){return(0,b.jsx)(p.Z.Option,{value:e.sku,children:e.sku},e.id)}))})})]}),(0,b.jsx)(l.Z.Item,{name:["product","productType"],label:"Type",rules:[{required:!1,message:"must provide product Type"}],children:(0,b.jsx)(p.Z,{placeholder:"Please select a Type",onChange:function(){},children:j.M5.map((function(e){return(0,b.jsx)(p.Z.Option,{value:e.name,children:e.name},e.id)}))})}),(0,b.jsx)(l.Z.Item,{name:["product","productSubType"],label:"SubType",rules:[{required:!0}],children:(0,b.jsx)(p.Z,{placeholder:"Please select SubType of the product",children:j.gg.map((function(e){return(0,b.jsx)(p.Z.Option,{value:e.name,children:e.name},e.id)}))})}),(0,b.jsx)(l.Z.Item,{name:["product","productDetail"],label:"Detail",rules:[{required:!0}],children:(0,b.jsx)(p.Z,{placeholder:"Please select the detail definition",children:j.Xv.map((function(e){return(0,b.jsx)(p.Z.Option,{value:e.name,children:e.name},e.id)}))})}),(0,b.jsx)(l.Z.Item,{name:["product","productSku"],label:"SKU",rules:[{required:!1,message:"must provide products SKU"}],children:(0,b.jsx)(s.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productQuantityEff"],label:"Quantity Effected",rules:[{type:"number",min:0}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productQuantityInstock"],label:"Quantity inStock",rules:[{type:"number",min:0,max:99999}],children:(0,b.jsx)(m.Z,{disabled:!0})}),(0,b.jsx)(l.Z.Item,{name:["product","productPrice"],label:"Product Price",rules:[{type:"number",min:0,max:99999}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productPowderCoatingPrice"],label:"Powder Coating Price",rules:[{type:"number",min:0,max:99999}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productInstallationPrice"],label:"Installation Price",rules:[{type:"number",min:0,max:99999}],children:(0,b.jsx)(m.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productSize"],label:"Size",rules:[{required:!1}],children:(0,b.jsx)(s.Z,{})}),(0,b.jsx)(l.Z.Item,{name:["product","productDescription"],label:"Description",children:(0,b.jsx)(s.Z.TextArea,{style:{minHeight:"10rem",maxHeight:"25rem"}})}),(0,b.jsx)(l.Z.Item,{name:["product","productSpecification"],label:"Specification",children:(0,b.jsx)(s.Z.TextArea,{style:{minHeight:"10rem",maxHeight:"25rem"}})}),(0,b.jsx)(l.Z.Item,{name:["product","productUpdateLog"],label:"Update Log",children:(0,b.jsx)(s.Z.TextArea,{style:{minHeight:"10rem",maxHeight:"25rem"}})}),(0,b.jsxs)(l.Z.Item,{wrapperCol:(0,r.Z)((0,r.Z)({},S.wrapperCol),{},{offset:8}),children:[(0,b.jsx)(c.Z,{type:"primary",block:!0,style:{marginBottom:"1rem"},onClick:function(){v(!0),setTimeout((function(){var e,n,i=null===(e=t.current)||void 0===e?void 0:e.getFieldValue("product"),o=i.productQuantityAdd,c=i.productDescription,a=I[0],u=a.id,d=(0,r.Z)((0,r.Z)({},a),{},{currentInStock:a.currentInStock+o,updateLog:c});D(u,d).then((function(e){console.log("product ".concat(e," is create."))})),v(!1),null===(n=t.current)||void 0===n||n.resetFields()}),2e3)},children:"Submit"}),(0,b.jsx)(c.Z,{onClick:function(){var e;null===(e=t.current)||void 0===e||e.resetFields()},block:!0,children:"Reset Form"})]})]}))},w=function(){var e=(0,o.useState)({select:"Deposite",activate:void 0}),t=(0,i.Z)(e,2),n=t[0],a=t[1];return(0,b.jsx)("div",{style:{display:"flex",gap:"20px 5rem",alignItems:"flex-start",width:"100%"},children:(0,b.jsxs)("div",{style:{marginTop:"5rem",display:"flex",width:"100%"},children:[(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:" 2rem"},children:[(0,b.jsx)("h3",{children:"Please click to select operation "}),(0,b.jsx)(c.Z,{type:"Deposite"===n.select?"primary":void 0,onClick:function(){a((0,r.Z)((0,r.Z)({},n),{},{select:"Deposite"}))},children:"Deposite into the WareHouse"}),(0,b.jsx)(c.Z,{type:"Create"===n.select?"primary":void 0,onClick:function(){a((0,r.Z)((0,r.Z)({},n),{},{select:"Create"}))},children:"Create New Product"}),(0,b.jsx)(c.Z,{type:"Abolish"===n.select?"primary":void 0,onClick:function(){a((0,r.Z)((0,r.Z)({},n),{},{select:"Abolish"}))},children:"Abolish / Edit Product Info"})]}),function(e){switch(e.select){case"Deposite":return(0,b.jsx)(g,{});case"Create":return(0,b.jsx)(I,{});case"Abolish":return(0,b.jsx)(P,{})}}(n)]})})}},5969:function(e,t,n){n.d(t,{CY:function(){return a},M5:function(){return o},Xv:function(){return r},ZF:function(){return d},fv:function(){return u},gg:function(){return i},iM:function(){return c}});var r=[{id:0,name:"no detail"},{id:1,name:"sideOpen"},{id:2,name:"sideOpen with Drawers"},{id:3,name:"topOpen"},{id:4,name:"caravan Toolbox"},{id:5,name:"generator Toolbox"},{id:6,name:"3/4 sideopen Toolbox"},{id:7,name:"full sideopen Toolbox"},{id:8,name:"full sideopen Toolbox with drawers"},{id:9,name:"2 doors canopy"},{id:10,name:"3 doors canopy"}],i=[{id:0,name:"no subtype"},{id:1,name:"dogbox"},{id:2,name:"drawbar"},{id:3,name:"gullwing"},{id:4,name:"sideOpen Toolbox"},{id:5,name:"topOpen Toolbox"},{id:6,name:"underTray Toolbox"},{id:7,name:"campers Toolbox"},{id:8,name:"trundel drawer"},{id:9,name:"tub Toolbox"},{id:10,name:"partTray canopy"},{id:11,name:"dualcab canopy"},{id:12,name:"extracab canopy"},{id:13,name:"singlecab canopy"},{id:14,name:"dog canopy"},{id:15,name:"1000H canopy"},{id:16,name:"jackoff canopy"}],o=[{id:1,name:"toolbox"},{id:2,name:"canopy"},{id:3,name:"tray"},{id:4,name:"accessories"},{id:5,name:"4x4"},{id:6,name:"serviceBody"},{id:7,name:"combo"},{id:8,name:"tubCanopy"}],c=[{id:0,name:"pending"},{id:1,name:"partiallyPayed"},{id:2,name:"fullyPayed"}],a=[{id:0,name:"waitingForMaterial"},{id:1,name:"machineProcessing"},{id:2,name:"machineProcessFinished"},{id:3,name:"powderCoating"},{id:4,name:"powderCoatingFinished"},{id:5,name:"waitingForInstallation"},{id:6,name:"installing"},{id:7,name:"ready"}],u=[{id:0,name:"waitingForCarrier"},{id:1,name:"delivering"},{id:2,name:"delivered"},{id:3,name:"cannotDeliver"},{id:4,name:"returningToVender"},{id:5,name:"returnedItemArrived"},{id:6,name:"itemDamagedInTransport"}],d=[{id:0,name:"Australian Post"},{id:1,name:"Big Post"},{id:2,name:"FastWay"}]}}]);
//# sourceMappingURL=456.1a2daf57.chunk.js.map