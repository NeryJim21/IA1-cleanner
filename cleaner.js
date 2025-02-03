function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states, iteration, resetFlag) {
    if (states[1] === "CLEAN" && states[2] === "CLEAN" && !resetFlag) {
        document.getElementById("log").innerHTML += "<br>Ambos estados están limpios. Reiniciando en B...";
        states[0] = "B";
        states[1] = "DIRTY";
        states[2] = "DIRTY";
        resetFlag = true;
    } else if (states[1] === "CLEAN" && states[2] === "CLEAN" && resetFlag) {
        document.getElementById("log").innerHTML += "<br>Ambos estados están limpios nuevamente. Fin del proceso.";
        return;
    }

    var location = states[0];
    var state = location == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML += `<br>Iteration: ${iteration} | Location: ${location} | Action: ${action_result}`;
    
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";
    
    setTimeout(function () { test(states, iteration + 1, resetFlag); }, 2000);
}

var states = ["A", "DIRTY", "DIRTY"];
test(states, 1, false);
