import { Decimal } from "@prisma/client/runtime/library";


export const toDecimalTwoPlaces = (value: number): Decimal => {
    return new Decimal(value.toFixed(2));
}