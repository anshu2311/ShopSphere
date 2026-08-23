import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({amount, onSuccess, onError}) => {
 return <PayPalScriptProvider options={{"client-id":"BAA910v__fKSJ4cDIAmBmQrvj4dPEXsfTKuMSL8gu3ucMOOmQ95_7RePnHoo2NT63U6hd-J-x8DjpiHarI"}}>
  <PayPalButtons style={{layout: "vertical"}}
  createOrder={(data, actions) => {
   return actions.order.create({
    purchase_units: [{amount: {value: amount}}]
   })
  }}
  onApprove={(data, actions) => {
   return actions.order.capture().then(onSuccess)
  }}
  onError={onError} 
 />
 </PayPalScriptProvider>
}

export default PayPalButton