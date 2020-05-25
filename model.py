import random as rand


class Model:

    data = [
        {'name': 'amitko92', 'level': 0, 'score': 0},
        {'name': 'or23', 'level': 0, 'score': 0},
        {'name': 'guy_1', 'level': 0, 'score': 0},
        {'name': 'aviv', 'level': 0, 'score': 0},
        {'name': 'amit', 'level': 0, 'score': 0},
        {'name': 'heder', 'level': 0, 'score': 0},
        {'name': 'niv', 'level': 0, 'score': 0},
        {'name': 'roi', 'level': 0, 'score': 0}
    ]

    def get_score_from_database(self):
        level = rand.random()
        for i in self.data:
            i['level'] = rand.randint(1, 21)
            i['score'] = i.get('level')*2
            print(self.data.sort(key=lambda x:x.get('score'), reverse=True))
        return self.data
