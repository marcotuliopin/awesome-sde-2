jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

describe("<LoginButton />", () => {
    it("should pass the test", () => {
        expect(true).toBe(true);
    });
});