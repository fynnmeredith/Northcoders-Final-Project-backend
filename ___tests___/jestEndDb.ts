import { db } from "../db/connection";
import {} from "ts-jest";

test("obligatory test", () => {});

afterAll(() => db.end());
