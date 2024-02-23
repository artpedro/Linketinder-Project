import com.acelerazg.cli_app.InputCLI
import com.acelerazg.users.Company
import com.acelerazg.users.UserHandler

import spock.lang.Specification
import org.mockito.MockedStatic
import org.mockito.Mockito

class UserHandlerTest extends Specification {

    MockedStatic<InputCLI> mockedStaticInputCLI

    def setup() {
        // Prepare the static mock for InputCLI.getCommand
        mockedStaticInputCLI = Mockito.mockStatic(InputCLI)
        mockedStaticInputCLI.when(InputCLI.&getCommand).thenReturn("company") // Adjust based on your test case needs
    }

    def cleanup() {
        mockedStaticInputCLI.close()
    }

    def "test newUser method with mocked getCommand and buildUser"() {
        given:
        // Use a Spy to partially mock the UserHandler class
        UserHandler userHandler = Spy(UserHandler)
        def mockUserMap = [name: "Mock User", desc: "This is a mocked user", email: "mock@example.com", country: "MockCity", CEP: "00000000", CPF_CNPJ: "0000000", skills:[], likes:[]]

        userHandler.buildUser(false) >> mockUserMap // Correctly stubbing method using Spock's syntax

        and:
        def mockAllUsers = ["candidate":[], "company":[]]

        when:
        def users = userHandler.newUser(mockAllUsers)

        then:
        users["company"].size() == 1
        users["company"][0] == new Company(mockUserMap) // Adjust this assertion based on the actual expected behavior
    }
}
