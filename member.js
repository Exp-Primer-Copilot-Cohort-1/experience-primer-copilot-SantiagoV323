function skillsMember(){
    var skills = ['HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'Django'];
    var member = {
        name: 'John',
        age: 20,
        skills: skills,
        sayHi: function(){
            console.log('Hi');
        }
    };
    console.log(member.skills);
    console.log(member.skills[1]);
    member.sayHi();
}