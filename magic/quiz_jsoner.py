import json

def main():
    print("Commands:")
    print("<D><ENTER> ends the quiz")
    print("<Q><ENTER> begins (Question Mode).")
    print("~~~ (Question mode):")
    print("~~~ Enter question statement first.")
    print("~~~ <A><ENTER> to enter answer. Next line is the answer.")
    print("~~~ <C><ENTER> to enter correct answer between 1 and N, where N is the number of answers you've entered. This ends (Question Mode).")
    print()
    print("Enter Quiz name:")
    name = str(input())
    print("Quiz named \'" + name + "\'.")
    quiz = dict()
    quiz['name'] = name
    qs = dict()
    q_br = 0

    while(True):
        print("Enter Command:")
        inp = str(input())
        comm = inp.lower()
        
        if comm == 'd':
            print("Exiting.")
            break
        else:
#           print("input: " + inp)
            
            if comm == 'q':
                wve = "~~~ "
                q_br += 1
                print(wve + "Question #" + str(q_br) + ':')
                print(wve + "Enter question statement:")
                print(wve, end='')
                q = str(input())
                print(wve + "Question is: \'" + q + "\'.")
                print(wve + "<A> to enter answer, <C> for the correct one, ending the question.:")
                q_corr = 0
                q_a_br = 0
                q_as = dict()
                while(True):
                    print(wve + "<A>|<C>|<D> question command:")
                    print(wve, end='')
                    qm_inp = str(input())
                    qm_comm = qm_inp.lower()
                    
                    if qm_comm == 'd':
                        print("Aborting.")
                        exit()
                    elif qm_comm == 'c':
                        qm_corr = 0
                        while qm_corr < 1 or qm_corr > q_a_br:
                            print(wve + "Enter correct answer number between 0 and " + str(q_a_br) + '.')
                            print(wve + "Correct answer is #:")
                            print(wve, end='')
                            qm_corr = int(input())
                        q_corr = qm_corr
                        break
                    elif qm_comm == 'a':
                        q_a_br += 1
                        print(wve + "A#" + str(q_a_br) + ": ", end='')
                        a = str(input())
                        q_as[q_a_br] = a
                    else:
                        print(wve + "Invalid (Question Mode) command: \'" + qm_comm + "\'.")
                        print(wve + "Try again.")

                qs[q_br] = dict()
                qs[q_br]['q'] = q
                qs[q_br]['as'] = q_as
                qs[q_br]['c'] = q_corr

            else:
                print("Invalid command. Try again:")


    quiz['qs'] = qs

    print()
    print(quiz)

    json_quiz = json.dumps(quiz, indent=4)
    with open(str(quiz['name']).replace(' ', '_').lower() + ".json", 'w') as f:
        f.write(json_quiz)

if __name__ == '__main__':
    main()
