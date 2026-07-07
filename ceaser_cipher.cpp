#include <iostream>
#include <string>
using namespace std;

int main()
{
    string text;
    int shift;

    cout << "Enter a message: ";
    getline(cin, text);

    cout << "Enter shift value: ";
    cin >> shift;

    // Encryption
    for (int i = 0; i < text.length(); i++)
    {
        if (text[i] >= 'A' && text[i] <= 'Z')
        {
            text[i] = ((text[i] - 'A' + shift) % 26) + 'A';
        }
        else if (text[i] >= 'a' && text[i] <= 'z')
        {
            text[i] = ((text[i] - 'a' + shift) % 26) + 'a';
        }
    }

    cout << "\nEncrypted Message: " << text << endl;

    return 0;
}