document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const form = document.getElementById('contactForm');
  const messageEl = document.getElementById('formMessage');

  if (form && messageEl) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      messageEl.textContent = 'Ce formulaire n’est pas connecté ; votre demande n’a pas été envoyée. Utilisez le bouton WhatsApp pour nous contacter.';
    });
  }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {
          // Ignore registration failures for local/static browsing.
        });
      });
    }

    const installAppButton = document.getElementById('installAppButton');
    let deferredInstallPrompt = null;

    if (installAppButton) {
      const showInstallButton = () => {
        installAppButton.hidden = false;
      };

      const hideInstallButton = () => {
        installAppButton.hidden = true;
      };

      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredInstallPrompt = event;
        showInstallButton();
      });

      window.addEventListener('appinstalled', () => {
        hideInstallButton();
        deferredInstallPrompt = null;
      });

      installAppButton.addEventListener('click', async () => {
        if (!deferredInstallPrompt) {
          return;
        }

        deferredInstallPrompt.prompt();
        const result = await deferredInstallPrompt.userChoice;
        if (result.outcome === 'accepted') {
          hideInstallButton();
        }
        deferredInstallPrompt = null;
      });
    }

    const exerciseResult = document.getElementById('exerciseResult');
    const exerciseSteps = document.getElementById('exerciseSteps');
    const solveExerciseButton = document.getElementById('solveExercise');
    const exercisePhotoInput = document.getElementById('exercisePhoto');
    const captureExercisePhotoButton = document.getElementById('captureExercisePhoto');
    const removeExercisePhotoButton = document.getElementById('removeExercisePhoto');
    const exercisePhotoPreview = document.getElementById('exercisePhotoPreview');
    const exercisePhotoImage = document.getElementById('exercisePhotoImage');
    const photoOcrStatus = document.getElementById('photoOcrStatus');
    const aiApiKeyInput = document.getElementById('aiApiKey');
    const fixWithAiButton = document.getElementById('fixWithAi');
    const aiStatus = document.getElementById('aiStatus');
    const translations = {
      fr: {
        title: 'Calculatrice intelligente', eyebrow: 'Calcul précis', language: 'Langue', angle: 'Angle', degrees: 'Degrés', radians: 'Radians', expression: 'Expression',
        clear: 'Effacer tout', backspace: 'Effacer le dernier caractère', openParen: 'Parenthèse ouvrante',
        closeParen: 'Parenthèse fermante', divide: 'Diviser', multiply: 'Multiplier', subtract: 'Soustraire',
        percent: 'Pourcentage', decimal: 'Virgule décimale', add: 'Additionner', equals: 'Calculer',
        sine: 'Sinus', cosine: 'Cosinus', tangent: 'Tangente', squareRoot: 'Racine carrée', logarithm: 'Logarithme décimal', naturalLog: 'Logarithme népérien', absolute: 'Valeur absolue', square: 'Carré', power: 'Puissance', factorial: 'Factorielle', pi: 'Pi', euler: 'Constante d’Euler',
        solverEyebrow: 'Résolution pas à pas', solverTitle: 'Résoudre un exercice', solverExpression: 'Expression mathématique', solverPlaceholder: '(12 + 8) × 3', solve: 'Résoudre', solution: 'Solution', stepsHeading: 'Étapes',
        error: 'Expression incorrecte.', divisionByZero: 'La division par zéro est impossible.', domainError: 'Cette opération n’a pas de résultat réel.', rangeError: 'Nombre trop grand pour cette opération.', home: 'Accueil', gallery: 'Galerie', navigation: 'Navigation principale', scientificKeys: 'Fonctions scientifiques', calculatorKeys: 'Touches de la calculatrice',
        photoChoose: 'Prendre ou choisir une photo', photoRemove: 'Retirer la photo', photoLoading: 'Lecture de la photo…', photoReady: 'Expression détectée :', photoError: 'Aucune expression lisible n’a été trouvée.', photoUnavailable: 'Le moteur OCR n’est pas disponible pour ce navigateur.',
        aiApiKeyLabel: 'Clé API (si vous en avez)', aiApiPlaceholder: 'Clé API', aiFixButton: 'Corriger automatiquement', installApp: 'Installer l’app',
      },
      ht: {
        title: 'Kalkilatris entelijan', eyebrow: 'Kalkil presi', language: 'Lang', angle: 'Ang', degrees: 'Degre', radians: 'Radyan', expression: 'Ekspresyon',
        clear: 'Efase tout', backspace: 'Efase dènye karaktè a', openParen: 'Louvri parantèz',
        closeParen: 'Fèmen parantèz', divide: 'Divize', multiply: 'Miltipliye', subtract: 'Soustrè',
        percent: 'Pousantaj', decimal: 'Vigil desimal', add: 'Adisyone', equals: 'Kalkile',
        sine: 'Sinis', cosine: 'Kosinis', tangent: 'Tanjant', squareRoot: 'Rasin kare', logarithm: 'Logaritm desimal', naturalLog: 'Logaritm natirèl', absolute: 'Valè absoli', square: 'Kare', power: 'Pisans', factorial: 'Faktoryèl', pi: 'Pi', euler: 'Konstan Euler',
        solverEyebrow: 'Rezoud etap pa etap', solverTitle: 'Rezoud yon egzèsis', solverExpression: 'Ekspresyon matematik', solverPlaceholder: '(12 + 8) × 3', solve: 'Rezoud', solution: 'Solisyon', stepsHeading: 'Etap',
        error: 'Ekspresyon an pa kòrèk.', divisionByZero: 'Ou pa ka divize pa zewo.', domainError: 'Operasyon sa a pa gen rezilta reyèl.', rangeError: 'Nimewo a twò gwo pou operasyon sa a.', home: 'Akèy', gallery: 'Galri', navigation: 'Navigasyon prensipal', scientificKeys: 'Fonksyon syantifik', calculatorKeys: 'Bouton kalkilatris la',
        photoChoose: 'Pran oswa chwazi yon foto', photoRemove: 'Retire foto a', photoLoading: 'Lekti foto an…', photoReady: 'Ekspresyon detekte :', photoError: 'Pa gen ekspresyon ki lizib.', photoUnavailable: 'Mote OCR a pa disponib nan navigatè sa a.',
        aiApiKeyLabel: 'Kle API (si ou gen)', aiApiPlaceholder: 'Kle API', aiFixButton: 'Korije otomatikman', installApp: 'Enstale app la',
      },
      en: {
        title: 'Smart Calculator', eyebrow: 'Precise calculation', language: 'Language', angle: 'Angle', degrees: 'Degrees', radians: 'Radians', expression: 'Expression',
        clear: 'Clear all', backspace: 'Delete last character', openParen: 'Open parenthesis',
        closeParen: 'Close parenthesis', divide: 'Divide', multiply: 'Multiply', subtract: 'Subtract',
        percent: 'Percentage', decimal: 'Decimal point', add: 'Add', equals: 'Calculate',
        sine: 'Sine', cosine: 'Cosine', tangent: 'Tangent', squareRoot: 'Square root', logarithm: 'Common logarithm', naturalLog: 'Natural logarithm', absolute: 'Absolute value', square: 'Square', power: 'Power', factorial: 'Factorial', pi: 'Pi', euler: 'Euler’s constant',
        solverEyebrow: 'Step-by-step solution', solverTitle: 'Solve an exercise', solverExpression: 'Math expression', solverPlaceholder: '(12 + 8) × 3', solve: 'Solve', solution: 'Solution', stepsHeading: 'Steps',
        error: 'Invalid expression.', divisionByZero: 'Division by zero is not possible.', domainError: 'This operation has no real result.', rangeError: 'Number is too large for this operation.', home: 'Home', gallery: 'Gallery', navigation: 'Main navigation', scientificKeys: 'Scientific functions', calculatorKeys: 'Calculator keys',
        photoChoose: 'Take or choose a photo', photoRemove: 'Remove photo', photoLoading: 'Reading the photo…', photoReady: 'Detected expression:', photoError: 'No readable expression was found.', photoUnavailable: 'The OCR engine is not available in this browser.',
        aiApiKeyLabel: 'API key (if you have one)', aiApiPlaceholder: 'API key', aiFixButton: 'Auto-correct', installApp: 'Install app',
      },
    };

    const absolute = (value) => (value < 0n ? -value : value);

    const greatestCommonDivisor = (left, right) => {
      let a = absolute(left);
      let b = absolute(right);
      while (b !== 0n) {
        [a, b] = [b, a % b];
      }
      return a;
    };

    const fraction = (numerator, denominator = 1n, approximate = false) => {
      if (denominator === 0n) {
        throw new Error('DIVISION_BY_ZERO');
      }
      const sign = denominator < 0n ? -1n : 1n;
      const divisor = greatestCommonDivisor(numerator, denominator);
      return {
        numerator: (numerator / divisor) * sign,
        denominator: absolute(denominator / divisor),
        approximate,
      };
    };

    const numberValue = (value) => Number(value.numerator) / Number(value.denominator);

    const approximateFraction = (value) => {
      if (!Number.isFinite(value)) {
        throw new Error('RANGE_ERROR');
      }
      const [mantissa, exponentText = '0'] = Math.abs(value).toString().toLowerCase().split('e');
      const exponent = Number(exponentText);
      const [whole, decimals = ''] = mantissa.split('.');
      let numerator = BigInt(`${whole}${decimals}`);
      let denominator = 1n;
      const scale = decimals.length - exponent;
      if (scale > 0) {
        denominator = 10n ** BigInt(scale);
      } else if (scale < 0) {
        numerator *= 10n ** BigInt(-scale);
      }
      return fraction(value < 0 ? -numerator : numerator, denominator, true);
    };

    const integerSquareRoot = (value) => {
      if (value < 2n) {
        return value;
      }
      let root = value;
      let next = (root + 1n) / 2n;
      while (next < root) {
        root = next;
        next = (root + value / root) / 2n;
      }
      return root;
    };

    const tokenize = (source) => {
      const tokens = [];
      let position = 0;
      while (position < source.length) {
        const remaining = source.slice(position);
        const whitespace = remaining.match(/^\s+/);
        if (whitespace) {
          position += whitespace[0].length;
          continue;
        }

        const number = remaining.match(/^(?:\d+(?:[.,]\d*)?|[.,]\d+)/);
        if (number) {
          tokens.push({ type: 'number', value: number[0] });
          position += number[0].length;
          continue;
        }

        const identifier = remaining.match(/^[a-z]+/i);
        if (identifier) {
          tokens.push({ type: 'identifier', value: identifier[0].toLowerCase() });
          position += identifier[0].length;
          continue;
        }

        const symbol = source[position];
        if (symbol === 'π') {
          tokens.push({ type: 'identifier', value: 'pi' });
          position += 1;
          continue;
        }
        if ('+-−*/×÷()%^!'.includes(symbol)) {
          tokens.push({ type: 'operator', value: symbol });
          position += 1;
          continue;
        }
        throw new Error('INVALID_EXPRESSION');
      }
      return tokens;
    };

    const evaluateExpression = (source, steps = null) => {
      const tokens = tokenize(source);
      let position = 0;
      const current = () => tokens[position];
      const saveStep = (expression, value) => {
        if (steps) {
          steps.push(`${expression} = ${formatFraction(value, languageSelect.value)}`);
        }
      };

      const applyFunction = (name, argument) => {
        if (name === 'abs') {
          return fraction(absolute(argument.numerator), argument.denominator, argument.approximate);
        }
        if (name === 'sqrt' && argument.numerator >= 0n) {
          const numeratorRoot = integerSquareRoot(argument.numerator);
          const denominatorRoot = integerSquareRoot(argument.denominator);
          if (numeratorRoot ** 2n === argument.numerator && denominatorRoot ** 2n === argument.denominator) {
            return fraction(numeratorRoot, denominatorRoot, argument.approximate);
          }
        }

        const input = numberValue(argument);
        let output;
        if (name === 'sqrt' && input >= 0) {
          output = Math.sqrt(input);
        } else if (name === 'sin' || name === 'cos' || name === 'tan') {
          const angle = angleSelect && angleSelect.value === 'rad' ? input : input * Math.PI / 180;
          if (name === 'tan' && Math.abs(Math.cos(angle)) < 1e-12) {
            throw new Error('DOMAIN_ERROR');
          }
          output = Math[name](angle);
        } else if (name === 'ln' && input > 0) {
          output = Math.log(input);
        } else if (name === 'log' && input > 0) {
          output = Math.log10(input);
        } else {
          throw new Error('DOMAIN_ERROR');
        }
        return approximateFraction(output);
      };

      const applyPower = (base, exponent) => {
        if (exponent.denominator === 1n) {
          const power = exponent.numerator;
          const magnitude = absolute(power);
          if (magnitude > 500n) {
            throw new Error('RANGE_ERROR');
          }
          if (power < 0n && base.numerator === 0n) {
            throw new Error('DIVISION_BY_ZERO');
          }
          const numerator = base.numerator ** magnitude;
          const denominator = base.denominator ** magnitude;
          return power < 0n
            ? fraction(denominator, numerator, base.approximate || exponent.approximate)
            : fraction(numerator, denominator, base.approximate || exponent.approximate);
        }

        const output = Math.pow(numberValue(base), numberValue(exponent));
        if (!Number.isFinite(output)) {
          throw new Error('DOMAIN_ERROR');
        }
        return approximateFraction(output);
      };

      const parsePrimary = () => {
        const token = current();
        if (!token) {
          throw new Error('INVALID_EXPRESSION');
        }
        if (token.value === '(') {
          position += 1;
          const value = parseExpression();
          if (!current() || current().value !== ')') {
            throw new Error('INVALID_EXPRESSION');
          }
          position += 1;
          return value;
        }
        if (token.type === 'identifier') {
          position += 1;
          if (token.value === 'pi') {
            return approximateFraction(Math.PI);
          }
          if (token.value === 'e') {
            return approximateFraction(Math.E);
          }
          if (!['sqrt', 'sin', 'cos', 'tan', 'ln', 'log', 'abs'].includes(token.value) || !current() || current().value !== '(') {
            throw new Error('INVALID_EXPRESSION');
          }
          position += 1;
          const argument = parseExpression();
          if (!current() || current().value !== ')') {
            throw new Error('INVALID_EXPRESSION');
          }
          position += 1;
          const value = applyFunction(token.value, argument);
          saveStep(`${token.value}(${formatFraction(argument, languageSelect.value)})`, value);
          return value;
        }
        if (token.type !== 'number') {
          throw new Error('INVALID_EXPRESSION');
        }

        position += 1;
        const [whole, decimals = ''] = token.value.replace(',', '.').split('.');
        const scale = 10n ** BigInt(decimals.length);
        return fraction(BigInt(`${whole || '0'}${decimals}`), scale);
      };

      const parsePostfix = () => {
        let value = parsePrimary();
        while (current() && ['%', '!'].includes(current().value)) {
          const operator = current().value;
          position += 1;
          if (operator === '%') {
            value = fraction(value.numerator, value.denominator * 100n, value.approximate);
          } else {
            if (value.denominator !== 1n || value.numerator < 0n || value.numerator > 500n) {
              throw new Error('DOMAIN_ERROR');
            }
            const argument = value.numerator;
            let product = 1n;
            for (let factor = 2n; factor <= argument; factor += 1n) {
              product *= factor;
            }
            value = fraction(product);
            saveStep(`${argument}!`, value);
          }
        }
        return value;
      };

      const parsePower = () => {
        const base = parsePostfix();
        if (current() && current().value === '^') {
          position += 1;
          const exponent = parseUnary();
          const value = applyPower(base, exponent);
          saveStep(`${formatFraction(base, languageSelect.value)} ^ ${formatFraction(exponent, languageSelect.value)}`, value);
          return value;
        }
        return base;
      };

      const parseUnary = () => {
        if (current() && (current().value === '+' || current().value === '-' || current().value === '−')) {
          const operator = current().value;
          position += 1;
          const value = parseUnary();
          return operator === '+' ? value : fraction(-value.numerator, value.denominator, value.approximate);
        }
        return parsePower();
      };

      const parseTerm = () => {
        let value = parseUnary();
        while (current() && ['*', '×', '/', '÷'].includes(current().value)) {
          const operator = current().value;
          position += 1;
          const left = value;
          const right = parseUnary();
          if (operator === '*' || operator === '×') {
            value = fraction(
              left.numerator * right.numerator,
              left.denominator * right.denominator,
              left.approximate || right.approximate,
            );
          } else {
            value = fraction(
              left.numerator * right.denominator,
              left.denominator * right.numerator,
              left.approximate || right.approximate,
            );
          }
          const displayedOperator = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
          saveStep(`${formatFraction(left, languageSelect.value)} ${displayedOperator} ${formatFraction(right, languageSelect.value)}`, value);
        }
        return value;
      };

      const parseExpression = () => {
        let value = parseTerm();
        while (current() && ['+', '-', '−'].includes(current().value)) {
          const operator = current().value;
          position += 1;
          const left = value;
          const right = parseTerm();
          const rightNumerator = operator === '+' ? right.numerator : -right.numerator;
          value = fraction(
            left.numerator * right.denominator + rightNumerator * left.denominator,
            left.denominator * right.denominator,
            left.approximate || right.approximate,
          );
          saveStep(`${formatFraction(left, languageSelect.value)} ${operator} ${formatFraction(right, languageSelect.value)}`, value);
        }
        return value;
      };

      if (tokens.length === 0) {
        throw new Error('INVALID_EXPRESSION');
      }
      const result = parseExpression();
      if (position !== tokens.length) {
        throw new Error('INVALID_EXPRESSION');
      }
      return result;
    };

    const formatFraction = (value, language) => {
      let denominator = value.denominator;
      let twos = 0;
      let fives = 0;
      while (denominator % 2n === 0n) {
        denominator /= 2n;
        twos += 1;
      }
      while (denominator % 5n === 0n) {
        denominator /= 5n;
        fives += 1;
      }

      const isApproximate = value.approximate || denominator !== 1n;
      const places = isApproximate ? 12 : Math.max(twos, fives);
      const scale = 10n ** BigInt(places);
      const scaledNumerator = absolute(value.numerator) * scale;
      let scaledValue = scaledNumerator / value.denominator;
      if (isApproximate && (scaledNumerator % value.denominator) * 2n >= value.denominator) {
        scaledValue += 1n;
      }

      const digits = scaledValue.toString().padStart(places + 1, '0');
      const whole = places === 0 ? digits : digits.slice(0, -places);
      const decimals = places === 0 ? '' : digits.slice(-places).replace(/0+$/, '');
      const separator = language === 'en' ? '.' : ',';
      const sign = value.numerator < 0n ? '-' : '';
      const approximation = isApproximate ? '≈ ' : '';
      return `${approximation}${sign}${whole}${decimals ? `${separator}${decimals}` : ''}`;
    };

    const applyLanguage = () => {
      const language = languageSelect.value;
      const copy = translations[language];
      document.documentElement.lang = language;
      document.title = `${copy.title} | Sney Tech`;
      title.textContent = copy.title;
      document.querySelectorAll('[data-calculator-copy]').forEach((element) => {
        element.textContent = copy[element.dataset.calculatorCopy];
      });
      languageSelect.setAttribute('aria-label', copy.language);
      document.querySelector('[data-calculator-nav]').setAttribute('aria-label', copy.navigation);
      angleSelect.setAttribute('aria-label', copy.angle);
      calculator.querySelectorAll('[data-calculator-region]').forEach((element) => {
        element.setAttribute('aria-label', copy[element.dataset.calculatorRegion === 'scientific' ? 'scientificKeys' : 'calculatorKeys']);
      });
      calculator.querySelectorAll('[data-label]').forEach((button) => {
        button.setAttribute('aria-label', copy[button.dataset.label]);
      });
      calculator.querySelectorAll('[data-scientific-label]').forEach((button) => {
        button.setAttribute('aria-label', copy[button.dataset.scientificLabel]);
      });
      decimalKey.textContent = language === 'en' ? '.' : ',';
      decimalKey.dataset.value = language === 'en' ? '.' : ',';
      expressionInput.placeholder = copy.expressionPlaceholder || '12 + 34';
      exerciseInput.placeholder = copy.solverPlaceholder;
      aiApiKeyInput.placeholder = copy.aiApiPlaceholder;
      calculate(false);
      solveExercise(false);
    };

    const getErrorMessage = (error, copy) => {
      if (error.message === 'DIVISION_BY_ZERO') {
        return copy.divisionByZero;
      }
      if (error.message === 'DOMAIN_ERROR') {
        return copy.domainError;
      }
      if (error.message === 'RANGE_ERROR') {
        return copy.rangeError;
      }
      return copy.error;
    };

    const calculate = (showError) => {
      const source = expressionInput.value.trim();
      const copy = translations[languageSelect.value];
      if (!source) {
        resultOutput.textContent = '0';
        statusOutput.textContent = '';
        return;
      }

      try {
        resultOutput.textContent = formatFraction(evaluateExpression(source), languageSelect.value);
        statusOutput.textContent = '';
      } catch (error) {
        resultOutput.textContent = showError ? '—' : '';
        statusOutput.textContent = showError ? getErrorMessage(error, copy) : '';
      }
    };

    const solveExercise = (showError) => {
      const source = exerciseInput.value.trim();
      const copy = translations[languageSelect.value];
      exerciseSteps.replaceChildren();
      if (!source) {
        exerciseResult.textContent = '';
        return;
      }

      try {
        const steps = [];
        const answer = formatFraction(evaluateExpression(source, steps), languageSelect.value);
        exerciseResult.textContent = `${copy.solution}: ${answer}`;
        if (steps.length === 0) {
          steps.push(`${source} = ${answer}`);
        }
        steps.forEach((step) => {
          const item = document.createElement('li');
          item.textContent = step;
          exerciseSteps.append(item);
        });
      } catch (error) {
        exerciseResult.textContent = showError ? getErrorMessage(error, copy) : '';
        if (showError && aiStatus) {
          aiStatus.textContent = 'Ekspresyon an pa bon. Klike “Korije otomatikman” pou eseye korije li.';
        }
      }
    };

    const normalizeExerciseText = (rawText) => {
      if (!rawText) {
        return '';
      }

      let text = rawText
        .replace(/×/g, '*')
        .replace(/✕/g, '*')
        .replace(/÷/g, '/')
        .replace(/−|–|—/g, '-')
        .replace(/,/g, '.')
        .replace(/π/g, 'pi')
        .replace(/²/g, '^2')
        .replace(/³/g, '^3')
        .replace(/\s+/g, ' ')
        .trim();

      const equationMatch = text.match(/([^=]+)(?:=|equals|égal|egale|resultat|résultat|reponse|réponse|answer|solution)/i);
      if (equationMatch && equationMatch[1]) {
        text = equationMatch[1].trim();
      }

      const functionNames = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'abs'];
      functionNames.forEach((name) => {
        const pattern = new RegExp(`\\b${name}\\b`, 'gi');
        text = text.replace(pattern, name);
      });

      const candidate = [];
      for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        const nextCharacter = text[index + 1] || '';
        const previousCharacter = text[index - 1] || '';

        if (/[0-9+\-*/^()!%.\s]/.test(character)) {
          candidate.push(character);
          continue;
        }

        if (/[a-z]/i.test(character)) {
          candidate.push(character);
          continue;
        }

        if (character === 'x' || character === 'X') {
          const before = /[0-9)]/.test(previousCharacter);
          const after = /[0-9(]/.test(nextCharacter);
          candidate.push(before && after ? '*' : character);
          continue;
        }

        if (character === 'e' && previousCharacter && /[0-9)]/.test(previousCharacter) && /[0-9]/.test(nextCharacter)) {
          candidate.push('e');
          continue;
        }

        if (['\u00A0', '\t'].includes(character)) {
          candidate.push(' ');
        }
      }

      let cleanText = candidate.join('').replace(/\s+/g, ' ').trim();
      cleanText = cleanText.replace(/(?<=\d)\s*(sin|cos|tan|log|ln|sqrt|abs)\s*/gi, '*$1(');
      cleanText = cleanText.replace(/\b(sin|cos|tan|log|ln|sqrt|abs)\s*/gi, '$1(');
      cleanText = cleanText.replace(/\(([^()]+)\)$/gi, '($1)');
      cleanText = cleanText.replace(/(?<=\d)\s*\(\s*/g, '(');
      cleanText = cleanText.replace(/\s*([+\-*/^!%])\s*/g, '$1');
      cleanText = cleanText.replace(/\s*\*\s*/g, '*');
      cleanText = cleanText.replace(/\s*\(\s*/g, '(');
      cleanText = cleanText.replace(/\s*\)\s*/g, ')');

      if (!cleanText || !/[0-9]/.test(cleanText)) {
        return '';
      }

      return cleanText;
    };

    const guessBetterExpression = (rawText) => {
      const candidate = normalizeExerciseText(rawText || '');
      if (!candidate) {
        return '';
      }

      let improved = candidate;
      improved = improved.replace(/[Oo]/g, '0');
      improved = improved.replace(/[lI]/g, '1');
      improved = improved.replace(/\s*\*\s*/g, '*');
      improved = improved.replace(/\s*\/\s*/g, '/');
      improved = improved.replace(/\s*\+\s*/g, '+');
      improved = improved.replace(/\s*\-\s*/g, '-');
      improved = improved.replace(/\bpi\b/gi, 'pi');
      improved = improved.replace(/(?<=\d)\s*\(\s*/g, '(');
      improved = improved.replace(/\)\s*(?=\d)/g, ')*');
      improved = improved.replace(/(?<=\d)x(?=\d)/gi, '*');
      improved = improved.replace(/(?<=\d)\s*x\s*(?=\d)/gi, '*');
      improved = improved.replace(/(?<=\))x(?=\d)/gi, '*');
      improved = improved.replace(/\babs\b/gi, 'abs');
      improved = improved.replace(/\b(?:sqrt|sin|cos|tan|log|ln)\b/gi, (match) => match.toLowerCase());
      improved = improved.replace(/\s+/g, '');
      return improved;
    };

    const correctExpressionWithAi = async (rawText) => {
      const sourceText = normalizeExerciseText(rawText || exerciseInput.value || '');
      if (!sourceText) {
        if (aiStatus) {
          aiStatus.textContent = 'Pa gen ekspresyon pou korije.';
        }
        return null;
      }

      const localCandidate = guessBetterExpression(sourceText);
      if (localCandidate && localCandidate !== sourceText) {
        if (aiStatus) {
          aiStatus.textContent = `Koreksyon otomatik : ${localCandidate}`;
        }
        exerciseInput.value = localCandidate;
        solveExercise(true);
        return localCandidate;
      }

      const apiKey = aiApiKeyInput ? aiApiKeyInput.value.trim() : '';
      if (!apiKey) {
        if (aiStatus) {
          aiStatus.textContent = 'Ekspresyon an pa ka korije otomatikman. Verifye fòmil la oswa antre yon lòt ekspresyon.';
        }
        return null;
      }

      if (aiStatus) {
        aiStatus.textContent = 'Koreksyon AI an kou…';
      }

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'openai/gpt-4o-mini',
            messages: [{
              role: 'user',
              content: `Tu es un correcteur de formules mathématiques. Retourne uniquement l’expression corrigée, sans texte inutile. Garde uniquement : chiffres, opérateurs + - * / ^ ( ) %, fonctions sqrt(), sin(), cos(), tan(), log(), ln(), abs(), et constantes pi, e. Expression brute : ${sourceText}.`,
            }],
          }),
        });

        if (!response.ok) {
          throw new Error('AI_REQUEST_FAILED');
        }

        const payload = await response.json();
        const content = payload?.choices?.[0]?.message?.content || '';
        const fixedText = normalizeExerciseText(content);
        if (!fixedText) {
          throw new Error('AI_NO_RESULT');
        }

        exerciseInput.value = fixedText;
        if (aiStatus) {
          aiStatus.textContent = `AI te korije ekspresyon an : ${fixedText}`;
        }
        solveExercise(true);
        return fixedText;
      } catch (error) {
        if (aiStatus) {
          aiStatus.textContent = 'AI pa ka korije ekspresyon sa a. Verifye fòmil la oswa chanje ekspresyon an.';
        }
        return null;
      }
    };

    const setExercisePhotoPreview = (file) => {
      if (!file || !exercisePhotoImage) {
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      exercisePhotoImage.src = objectUrl;
      exercisePhotoPreview.hidden = false;
      removeExercisePhotoButton.hidden = false;
    };

    const processExercisePhoto = async (file) => {
      if (!file) {
        return;
      }

      const copy = translations[languageSelect.value];
      photoOcrStatus.textContent = copy.photoLoading;

      if (!window.Tesseract || typeof window.Tesseract.recognize !== 'function') {
        photoOcrStatus.textContent = copy.photoUnavailable;
        return;
      }

      try {
        const { data } = await window.Tesseract.recognize(file, 'eng+fra');
        const extractedText = normalizeExerciseText(data?.text || '');

        if (!extractedText) {
          photoOcrStatus.textContent = copy.photoError;
          return;
        }

        exerciseInput.value = extractedText;
        photoOcrStatus.textContent = `${copy.photoReady} ${extractedText}`;
        solveExercise(true);
      } catch (error) {
        photoOcrStatus.textContent = copy.photoError;
      }
    };

    calculator.querySelectorAll('[data-value], [data-action], [data-insert]').forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.action === 'clear') {
          expressionInput.value = '';
        } else if (button.dataset.action === 'backspace') {
          expressionInput.value = expressionInput.value.slice(0, -1);
        } else if (button.dataset.action === 'equals') {
          calculate(true);
        } else if (button.dataset.insert !== undefined) {
          expressionInput.value += button.dataset.insert;
        } else {
          expressionInput.value += button.dataset.value;
        }
        if (button.dataset.action !== 'equals') {
          calculate(false);
        }
        expressionInput.focus();
      });
    });

    expressionInput.addEventListener('input', () => calculate(false));
    expressionInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculate(true);
      } else if (event.key === 'Escape') {
        expressionInput.value = '';
        calculate(false);
      }
    });
    exerciseInput.addEventListener('input', () => solveExercise(false));
    exerciseInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        solveExercise(true);
      } else if (event.key === 'Escape') {
        exerciseInput.value = '';
        solveExercise(false);
      }
    });
    solveExerciseButton.addEventListener('click', () => solveExercise(true));
    if (fixWithAiButton) {
      fixWithAiButton.addEventListener('click', () => {
        const text = exerciseInput.value || '';
        correctExpressionWithAi(text);
      });
    }
    if (captureExercisePhotoButton && exercisePhotoInput) {
      captureExercisePhotoButton.addEventListener('click', () => exercisePhotoInput.click());
    }
    if (removeExercisePhotoButton && exercisePhotoInput) {
      removeExercisePhotoButton.addEventListener('click', () => {
        exercisePhotoInput.value = '';
        exercisePhotoImage.src = '';
        exercisePhotoPreview.hidden = true;
        removeExercisePhotoButton.hidden = true;
        photoOcrStatus.textContent = '';
      });
    }
    if (exercisePhotoInput) {
      exercisePhotoInput.addEventListener('change', (event) => {
        const [file] = event.target.files || [];
        if (!file) {
          return;
        }
        setExercisePhotoPreview(file);
        processExercisePhoto(file);
      });
    }
    languageSelect.addEventListener('change', applyLanguage);
    angleSelect.addEventListener('change', () => {
      calculate(false);
      solveExercise(false);
    });
    applyLanguage();
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightbox && lightboxImage && lightboxCaption) {
    const galleryLinks = Array.from(document.querySelectorAll('.thumb'));
    const previousButton = lightbox.querySelector('.previous-photo');
    const nextButton = lightbox.querySelector('.next-photo');
    let randomizedLinks = [];
    let currentIndex = 0;

    const showPhoto = (index) => {
      currentIndex = (index + randomizedLinks.length) % randomizedLinks.length;
      const image = randomizedLinks[currentIndex].querySelector('img');
      lightboxImage.src = randomizedLinks[currentIndex].getAttribute('href');
      lightboxImage.alt = image ? image.alt : 'Image';
      lightboxCaption.textContent = image ? image.alt : 'Image';
    };

    const shuffleLinks = () => {
      randomizedLinks = [...galleryLinks];
      for (let index = randomizedLinks.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [randomizedLinks[index], randomizedLinks[randomIndex]] = [randomizedLinks[randomIndex], randomizedLinks[index]];
      }
    };

    galleryLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        shuffleLinks();
        showPhoto(randomizedLinks.indexOf(link));
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    previousButton.addEventListener('click', () => showPhoto(currentIndex - 1));
    nextButton.addEventListener('click', () => showPhoto(currentIndex + 1));

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    };

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.closest('.close-lightbox')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('active')) {
        return;
      }

      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        showPhoto(currentIndex - 1);
      } else if (event.key === 'ArrowRight') {
        showPhoto(currentIndex + 1);
      }
    });
  }
});
