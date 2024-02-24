import com.acelerazg.cli_app.InputCLI
import com.acelerazg.users.Candidate
import com.acelerazg.users.Company
import com.acelerazg.users.UserHandler
import org.mockito.MockedStatic
import org.mockito.Mockito
import spock.lang.Specification
import spock.lang.Unroll

class UserHandlerTest extends Specification {

    // Mocked expected input
    def mockAllUsers = ["candidate": [], "company": []]

    MockedStatic<InputCLI> mockedStaticInputCLI

    def setup() {
        // Prepare the static mock for InputCLI.getCommand
        mockedStaticInputCLI = Mockito.mockStatic(InputCLI)
    }

    def cleanup() {
        mockedStaticInputCLI.close()
    }

    @Unroll
    def "newUser adds new #userType correctly"() {
        given:
        UserHandler userHandler = Spy(UserHandler)

        // Mocking user input
        mockedStaticInputCLI.when(InputCLI.&getCommand).thenReturn(userType)

        // Mocking dependencies
        userHandler.buildUser(false) >> mockedUserMap
        userHandler.buildUser(true) >> mockedUserMap

        when:
        def users = userHandler.newUser(mockAllUsers)

        then:
        users[userType].size() == 1 // adds an user to the given map
        users[userType][0] == mockedUser // the user follows the model given by builder

        where:
        userType    | mockedUserMap                                                                                                                                                            | mockedUser
        'company'   | [name: "Mock User", desc: "This is a mocked user", email: "mock@example.com", country: "MockCity", CEP: "00000000", CPF_CNPJ: "0000000", skills: [], likes: []]          | new Company(mockedUserMap)
        'candidate' | [name: "Mock User", desc: "This is a mocked user", email: "mock@example.com", country: "MockCity", CEP: "00000000", CPF_CNPJ: "0000000", age: 99, skills: [], likes: []] | new Candidate(mockedUserMap)
    }

    def "newUser refuses to invalid input of user type"() {
        given:
        // Read last line printed
        UserHandler userHandler = new UserHandler()
        ByteArrayOutputStream outContent = new ByteArrayOutputStream()
        System.setOut(new PrintStream(outContent))

        String expected = "Invalid user"

        // Mocking parameters
        mockedStaticInputCLI.when(InputCLI.&getCommand).thenReturn("foo")

        when:
        def users = userHandler.newUser(mockAllUsers)

        then:
        outContent.toString().endsWith(expected + System.lineSeparator()) // prints "Invalid user"
        users['company'].isEmpty() // no company added
        users['candidate'].isEmpty() // no candidate added
    }
    @Unroll
    def "buildUser returns a valid #userType map"() {
        given:
        UserHandler userHandler = new UserHandler()

        // Mocking user input
        mockedStaticInputCLI.when(InputCLI.&getCommand).thenReturn("TestName", "Desc for test", "email@test.com", "TestCity", "0000000", "0000000", givenAge, "n")
        when:
        def outputMap = userHandler.buildUser(candidateFlag)
        then:
        outputMap == expectedMap // Output is a map to construct an user
        outputUser.newInstance(outputMap) == expectedUser // Output constructs the expected user
        where:
        userType   | outputUser | givenAge | expectedMap                                                                                                                                                  | candidateFlag | expectedUser
        "company"  | Company    | ""       | [name: "TestName", desc: "Desc for test", email: "email@test.com", country: "TestCity", CEP: "0000000", CPF_CNPJ: "0000000", skills: [], likes: []]          | false         | new Company(expectedMap)
        "candidate"| Candidate  | "99"     | [name: "TestName", desc: "Desc for test", email: "email@test.com", country: "TestCity", CEP: "0000000", CPF_CNPJ: "0000000", skills: [], likes: [], age: 99] | true          | new Candidate(expectedMap)
    }
}
