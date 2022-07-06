import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // update cherries topping to 3 and check the subtotal
  const cherriesTopping = await screen.findByRole("spinbutton", {
    name: "Cherries",
  });
  userEvent.clear(cherriesTopping);
  userEvent.type(cherriesTopping, "3");
  expect(toppingsSubtotal).toHaveTextContent("4.50");

  // update M&Ms topping to 1 and check the subtotal
  const mmsTopping = await screen.findByRole("spinbutton", { name: "M&Ms" });
  userEvent.clear(mmsTopping);
  userEvent.type(mmsTopping, "1");
  expect(toppingsSubtotal).toHaveTextContent("6.00");

  // update Hot fudge to 2 and check the subtotal
  const hotFudgeTopping = await screen.findByRole("spinbutton", {
    name: "Hot fudge",
  });
  userEvent.clear(hotFudgeTopping);
  userEvent.type(hotFudgeTopping, "2");
  expect(toppingsSubtotal).toHaveTextContent("9.00");
});
