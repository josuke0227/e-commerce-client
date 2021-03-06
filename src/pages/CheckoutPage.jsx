import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "../services/userService";
import Address from "../components/Address";
import AddressFormDialog from "../components/AddressFormDialog";

export default function CheckoutPage() {
  const {
    user,
    checkoutAccordion,
    addressDialog: dialogState,
    address: { entity, current },
  } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await getAddress(user);
      dispatch({ type: "SET_ADDRESSES", payload: data });
    };

    if (!user) return;
    loadUser();
  }, [user, dispatch]);

  useEffect(() => {
    if (!entity.length) return;
    const address = entity.filter((a) => a.isDefault === true);
    address.length
      ? dispatch({ type: "SET_ADDRESS", payload: address[0] })
      : dispatch({ type: "SET_ADDRESS", payload: entity[0] });
  }, [entity, dispatch]);

  if (!user || !current) return <div className="">Loading</div>;
  return (
    <>
      <AddressFormDialog dialogState={dialogState} />
      <Address address={current} state={checkoutAccordion} />
    </>
  );
}
